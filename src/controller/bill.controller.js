const Bill = require("../model/bill.model");
const {billNumber} = require('../helper/randonBill')
exports.create = async(req, res) => {
   const bill_number = billNumber()
 try {
    const data = {
      firstcheck_id : req.body.firstcheck_id,
      bill_number : bill_number,
      total_price:req.body.total_price
    }
     await Bill.create(data).then((success) => {
      if(success) {
         return res.status(201).json(success)
      }
    })
 } catch (error) {
  return res.status(500).json({message:error.message})  
 }
};
// get all 
exports.getAll = async (req, res) =>{
   try {
      await Bill.findAndCountAll().then((data) => {
         if(data.rows.length > 0) {
            return res.status(200).json(data)
         }
         return res.status(400).json({message:'NOT FOUND DATA'})
      })
   } catch (error) {
      return res.status(500).json({message:error.message}) 
      
   }
}
