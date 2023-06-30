const Bill = require("../model/bill.model");
const { billNumber } = require("../helper/randonBill");
const sequelize = require("../config/db.config");
const { QueryTypes } = require("sequelize");
const FirstCheck = require('../model/firstCheck.model')
exports.create = async (req, res) => {
  const bill_number = billNumber();
  try {
    let id;
    const data = {
      firstcheck_id: req.body.firstcheck_id,
      bill_number: bill_number,
      total_price: req.body.total_price,
    };
    await Bill.create(data).then((success) => {
      if (success) {
        id = success.firstcheck_id
        return res.status(201).json(success);  
      }
    });
    await FirstCheck.update({status:0}, {where:{id:id}})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all
exports.getAll = async (req, res) => {
  try {
    await Bill.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(400).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get data in bill
exports.dataBill = async (req, res) => {
  try {
    const sql = `
   select DISTINCT bl.id, bl.bill_number,bl.status,ft.details,
   bl.total_price,bl."createdAt" as date from bills bl 
   inner join treats tr on bl.id = tr.bill_id
   inner join firstchecks ft on bl.firstcheck_id = ft.id
   where bl.status = 1 order by bl."createdAt" ASC`;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.statusZero = async (req, res) => {
   try {
     const sql = `
    select DISTINCT bl.id, bl.bill_number,bl.status,ft.details,
    bl.total_price,bl.created_at from bills bl 
    inner join treats tr on bl.id = tr.bill_id
    inner join firstchecks ft on bl.firstcheck_id = ft.id
    where bl.status = 0 order by bl.created_at ASC`;
     const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
     if (data.length > 0) {
       return res.status(200).json(data);
     } else {
       return res.status(200).json(data);
     }
   } catch (error) {
     return res.status(200).json({ message: error.message });
   }
 };
// udpate status in bill data
exports.updatBill = async (req, res) => {
  try {
    const { id } = req.params;
    await Bill.update({ status: 0 }, { where: { id: id }}).then((updated) => {
      if (updated) {
        return res.status(200).json({ message: "Success" });
      } else {
        return res.status(404).json({ message: "CAN'T UPDAT" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
