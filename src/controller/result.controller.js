const Result = require("../model/result.model");
const Bill = require("../model/bill.model");
const sequelize = require('../config/db.config')
const {QueryTypes} = require('sequelize')
exports.create_result = async (req, res) => {
  try {
    const staff_name = req.payload.NAME;
    await Result.create({ ...req.body, staff_name: staff_name }).then(
      async (created) => {
        if (created) {
          await Bill.update({ status: 2 }, { where: { id: created.bill_id } });
        } else {
          return res.status(400).json({ message: "Failed" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all result 
exports.get_all_result = async (req, res) => {
    try {
      const sql =    
      `select DISTINCT bl.id, bl.bill_number,bl.status,ft.details,
      bl.total_price,rs.result,bl.created_at from bills bl 
      inner join treats tr on bl.id = tr.bill_id
      inner join firstchecks ft on bl.firstcheck_id = ft.id
      inner join results rs on bl.id = rs.bill_id
      where bl.status = 2 order by bl.created_at ASC`;
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      if (data.length > 0) {
        return res.status(200).json(data);
      } else {
        return res.status(200).json(data);
      }
    } catch (error) {
      return res.status(500).json({message:error.message})  
    }
}
