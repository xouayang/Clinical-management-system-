const PrescriptionDeails = require('../model/prescription_details.model');
const Prescription = require('../model/prescription.model');
const {billNumber} = require('../helper/randonBill')
// create data 
exports.create = async (req, res) => {
    const bill = billNumber();
    try {
       const item = req.body.item
       const staff_id = req.payload.ID 
       const {supplier_id} = req.body
       let successed = []
       const data = {
        staff_id:staff_id,
        supplier_id:supplier_id,
        bill_number:bill
       }
       await Prescription.create(data).then( async(result) => {
        if(result) {
         for (let i = 0; i < item.length; i++) {
        await  PrescriptionDeails.create({
            prescription_id:result.id,
            bill_number:result.bill_number,
            medicines_id:item[i].medicines_id,
            name:item[i].name,
            amount:item[i].amount,
            price:item[i].price,
            unit:item[i].unit,
            type_name:item[i].type_name
          }).then((success) =>{
              successed.push(success) 
          }) 
         }
        }
       })
       return res.status(201).json(successed)
        
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}