const saleDetails = require("../model/saleDetails.model");
const Offer = require("../model/offer.model");
const sequelize = require("../config/db.config");
const { QueryTypes } = require("sequelize");
// create sale data
exports.createSaleDetails = async (req, res) => {
  try {
    const staff_id = req.payload.ID;
    const treat_id = req.body.treat_id;
    const item = req.body.item;
    const id = item[0].treat_id;
    let result = [];
    if (!treat_id) {
      return res.status(404).json({ message: "not found data" });
    }
    for (let i = 0; i < item.length; i++) {
      await saleDetails
        .create({
          treat_id: treat_id,
          staff_id: staff_id,
          name: item[i].name,
          amount: item[i].amount,
          price: item[i].price,
        })
        .then((data) => {
          if (data) {
            result.push(data);
          }
        })
        .catch(() => {
          return res.status(400).json({ message: "cant not create" });
        });
    }
    await Offer.update({ status: 0 }, { where: { treat_id: id } });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get data offer
exports.getOffer = async (req, res) => {
  try {
    const nullData = [];
    const { id } = req.params;
    if (id === null) {
      return res.status(200).json(nullData);
    }
    const sql = `
     select of.offer_id,of.treat_id,mdt.type_name,of.name,of.amount,
     of.price,mdt.unit,of.created_at from offers of
     inner join medicines md on of.medicines_id = md.medicines_id 
     inner join medicinestypes mdt on md.medicines_type_id = mdt.id
     where of.treat_id = '${id}'
    `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get list of list
exports.get_of_list_order_medicines = async (req, res) => {
  try {
    const sql = `
    select of.offer_id,of.bill_number,of.treat_id,of.status,mdt.type_name,of.name,of.amount,
    of.price,mdt.unit,of.created_at from offers of
    inner join medicines md on of.medicines_id = md.medicines_id 
    inner join medicinestypes mdt on md.medicines_type_id = mdt.id
    where of.status = 1
   `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
