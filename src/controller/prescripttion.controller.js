const PrescriptionDeails = require('../model/prescription_details.model');
const Prescription = require('../model/prescription.model');
const {billNumber} = require('../helper/randonBill')
const sequelize = require('../config/db.config')
const {QueryTypes} = require('sequelize');

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
// get history of prescription 
exports.get_history_prescription = async (req, res) => {
    try { 
    const sql = `
       select pdt.bill_number,pdt.type_name,pdt.name,pdt.amount,pdt.price,pdt.unit
       ,sp.supplier_name,pdt.create_at,pt.status from prescriptions pt 
       inner join suppliers sp on pt.supplier_id = sp.id
       inner join prescription_details pdt on pt.id = pdt.prescription_id
       order by pdt.create_at ASC
    `
     const data = await sequelize.query(sql,{type:QueryTypes.SELECT});
     if(data.length > 0) {
        return res.status(200).json(data)
     }  else {
        return res.status(200).json(data)
     }  
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}
