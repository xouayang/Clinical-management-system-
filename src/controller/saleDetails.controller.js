const saleDetails = require("../model/saleDetails.model");
const sale = require("../model/sale.model");
const Offer = require("../model/offer.model");
// create sale data
exports.createSaleDetails = async (req, res) => {
  try {
    const staff_id = req.payload.ID;
    const treat_id = req.body.treat_id;
    const item = req.body.item;
    let result = []
    for (let i = 0; i < item.length; i++) {
     await saleDetails.create({
        treat_id:treat_id,
        staff_id:staff_id,
        name:item[i].name,
        amount:item[i].amount,
        price:item[i].price,
     }).then((data) => {
      if(data) {
       result.push(data)
      }
     }).catch((error) => {
      console.log(error)
     })
      
    }
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get data offer
exports.getOffer = async (req, res) => {
  try {
    const nullData = []
    const {id} = req.params;
    if(id === null){
      return res.status(200).json(nullData)
    } 
    await Offer.findAndCountAll({where:{treat_id:id}}).then((data) =>{
      if(data.rows.length > 0) {  
        return res.status(200).json(data)
      }
    }).catch((err) => {
     return res.status(404).json({message:err.message})
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
