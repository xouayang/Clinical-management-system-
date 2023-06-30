const Medicines = require("../model/Medicines.model");
const MedicinesType = require("../model/medicines.type");
const Offer = require("../model/offer.model");
const sequelize = require("../config/db.config");
const { QueryTypes } = require("sequelize");
exports.create = async (req, res) => {
  try {
    await Medicines.create({ ...req.body }).then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json("error");
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all data
exports.getAll = async (req, res) => {
  try {
    await MedicinesType.findAll().then((data) => {
      if (data.length > 0) {
        return res.status(200).json(data);
      }
    }).catch((error) =>{
      return res.status(404).json({message:error.message})
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getBy_id = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      select * from medicines
      where medicines_type_id = '${id}'
    `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// create order
exports.createOffer = async (req, res) => {
  try {
    const item = req.body.item;
    const treat_id = req.body.treat_id;
    let result = [];
    for (let i = 0; i < item.length; i++) {
     await Medicines.decrement("amount", {
        by: item[i].amount,
        where: {
          medicines_id: item[i].medicines_id,
        },
      });
      await Offer.create({
        treat_id: treat_id,
        medicines_id:item[i].medicines_id,
        amount: item[i].amount,
        name: item[i].name,
        price: item[i].price,
      })
        .then((data) => {
          if (data) {
            result.push(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
// get medicines dat and medincines type 
exports.getMedicinesType = async (req, res) => {
  try {
   const sql = `
     select md.medicines_id, md.name,md.amount,mdt.unit,md.price,mdt.type_name from medicinestypes mdt 
     inner join medicines md on mdt.id = md.medicines_type_id
     order by md.amount ASC
   ` 
   const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
   if(data.length > 0) {
     return res.status(200).json(data)
   } else {
    return res.status(400).json({message:"NOT FOUND DATA "})
   }
  } catch (error) {
   return res.status(500).json({message:error.message}) 
  }
}
