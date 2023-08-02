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
    select DISTINCT  of.offer_id,of.bill_number,of.treat_id,of.status,mdt.type_name,of.name,of.amount,
    of.price,mdt.unit,of.created_at from offers of
    inner join medicines md on of.medicines_id = md.medicines_id 
    inner join medicinestypes mdt on md.medicines_type_id = mdt.id
    where of.status = 2
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
exports.get_of_list_order_medicines_status1 = async (req, res) => {
  try {
    let outsideData1;
    let rows=[]
    let sum = 0;
    const sql = `
    select DISTINCT of.offer_id,of.bill_number,of.treat_id,of.status,mdt.type_name,of.name,of.amount,
    of.price,mdt.unit,of.created_at,ft.name as firstcheck_name from offers of
    inner join medicines md on of.medicines_id = md.medicines_id 
    inner join medicinestypes mdt on md.medicines_type_id = mdt.id
    inner join bills bl on of.treat_id = bl.id
    inner join firstchecks ft on bl.firstcheck_id = ft.id
    where of.status = 1
   `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data) {
      for (let i = 0; i < data.length; i++) {
         const outsideData = {
          offer_id :data[i].offer_id,
          bill_number:data[i].treat_id,
          firstcheck_name:data[i].firstcheck_name,
          status:data[i].status,
          created_at:data[i].created_at
         }
         const inside = {
          offer_id :data[i].offer_id,
          treat_id:data[i].treat_id,
          bill_number:data[i].bill_number,
          firstcheck_name:data[i].firstcheck_name,
          type_name:data[i].type_name,
          name:data[i].name,
          amount:data[i].amount,
          price:data[i].price,
          unit:data[i].unit,
          status:data[i].status,
          total_price:data[i].amount*data[i].price,
          created_at:data[i].created_at
         }
         const item = data[i];
         const itemTotal = item.amount * item.price;
         sum += itemTotal;
         outsideData1 = outsideData
         rows.push(inside)
      }
      return res.status(200).json({
        rows:rows
      });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get by id 
exports.get_of_list_by_id = async (req, res) => {
  try {
     const {id} = req.params;
    const sql = `
    select DISTINCT of.treat_id,of.bill_number,mdt.type_name,of.name,of.amount,
    of.price,mdt.unit,of.created_at from offers of
    inner join medicines md on of.medicines_id = md.medicines_id 
    inner join medicinestypes mdt on md.medicines_type_id = mdt.id
    inner join bills bl on of.treat_id = bl.id
    inner join firstchecks ft on bl.firstcheck_id = ft.id
    where of.treat_id = '${id}' and of.status = 1
   `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data) {
      let total_price = 0;
      let sum = 0;
      let bill ;
      data.forEach(item => {
        total_price = item.price * item.amount 
        sum += total_price,
        bill = item.bill_number
      });
       return res.status(200).json({rows:data,bill:bill,total_price:sum});
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
// update status order medicines 
exports.updateStatus = async (req, res) => {
  try {
    const {id} = req.params
    await Offer.update({status:2}, {where:{treat_id:id}})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}
