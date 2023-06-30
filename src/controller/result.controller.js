const Result = require("../model/result.model");
const Bill = require("../model/bill.model");
const sequelize = require("../config/db.config");
const { QueryTypes } = require("sequelize");
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
    const sql = `select DISTINCT bl.id,ft.name,bl.bill_number,bl.status,ft.details,
      bl.total_price,rs.result,bl.created_at from bills bl 
      inner join treats tr on bl.id = tr.bill_id
      inner join firstchecks ft on bl.firstcheck_id = ft.id
      inner join results rs on bl.id = rs.bill_id
      where bl.status = 2 order by bl.created_at ASC`;

    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if(data) {
      return res.status(200).json(data);
    } else {
      return res.status(200).json(data)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get result by bill id
exports.get_data_by_id = async (req, res) => {
  // try {
  //   let result1 = [];
  //   let outSideData;
  //   const { id } = req.params;
  //   const sql = `
  //     select DISTINCT tr.id as treat_id, bl.id,ft.name as firstcheck_name,di.name,bl.bill_number,bl.status,ft.details,
  //     bl.total_price,rs.result,bl.created_at from bills bl
  //     inner join treats tr on bl.id = tr.bill_id
  //     inner join diseases di on tr.disease_id = di.disease_id
  //     inner join firstchecks ft on bl.firstcheck_id = ft.id
  //     inner join results rs on bl.id = rs.bill_id
  //     where bl.status = 2 and bl.id = '${id}' order by bl.created_at ASC`;
  //   const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
  //   for (let i = 0; i < data.length; i++) {
  //     const data1 = {
  //       id: data[i].id,
  //       treat_id: data[i].treat_id,
  //       firstcheck_name: data[i].firstcheck_name,
  //       bill_number: data[i].bill_number,
  //       total_price: data[i].total_price,
  //       status: [i].status,
  //       details: data[i].details,
  //       result: data[i].result,
  //       created_at: data[i].created_at,
  //     };
  //     const name = {
  //       name: data[i].name,
  //     };
  //     result1.push(name);
  //     outSideData = data1;
  //   }
  //   return res.status(200).json({
  //     id:outSideData.id,
  //     treat_id:outSideData.treat_id,
  //     firstcheck_name:outSideData.firstcheck_name,
  //     bill_number:outSideData.bill_number,
  //     total_price:outSideData.total_price,
  //     status:outSideData.status,
  //     details:outSideData.details,
  //     result:outSideData.result,
  //     created_at:outSideData.created_at,
  //     rows:result1
  //   });
  // } catch (error) {
  //   return res.status().json({ message: error.message });
  // }
};
// get all
exports.dataResult = async (req, res) => {
  try {
    await Result.findAndCountAll().then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
