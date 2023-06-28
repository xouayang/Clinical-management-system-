const Treat = require("../model/treat.model");
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db.config");
// get all treat
exports.getAll = async (req, res) => {
  try {
    const sql = `
       select ft.id as firstCheckId,pt.id as patients_id, 
       pt.name,pt.address,pt.tel,pt.details,ft.weight,ft.height from patients pt
       inner join firstchecks ft on pt.id = ft.patients_id order by pt.created_at ASC `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.create = async (req, res) => {
  try {
    const item = req.body.item;
    const bill_id = req.body.bill_id;
    let datas = [];
    for (let i = 0; i < item.length; i++) {
      await Treat.create({
        bill_id: bill_id,
        disease_id: item[i].disease_id,
        details: item[i].details,
      })
        .then(async (result) => {
          if (result) {
            datas.push(result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return res.status(200).json(datas);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
// get data to display on bill
exports.getToBill = async (req, res) => {
  try {
    const { id } = req.params;
    const result = [];
    let sameData;
    const sql = `
    select DISTINCT bl.id,ft.id as first_id,ds.disease_id,ds.price,ts.details,ts."createdAt" as date, bl.total_price,bl.bill_number,pt.name,pt.address,pt.tel from treats ts
    inner join bills bl on ts.bill_id = bl.id
    inner join firstchecks ft on bl.firstcheck_id = ft.id
    inner join patients pt on ft.patients_id = pt.id
    inner join diseases ds on ts.disease_id = ds.disease_id
    where bl.id ='${id}'
    `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    for (let i = 0; i < data.length; i++) {
      const data1 = {
        id: data[i].disease_id,
        details: data[i].details,
        price: data[i].price,
      };
      const rows = {
        id: data[i].id,
        firstcheck_id: data[0].first_id,
        name: data[0].name,
        address: data[0].address,
        bill_number: data[0].bill_number,
        total_price: data[0].total_price,
      };
      result.push(data1);
      sameData = rows;
    }
    // console.log(sameData)
    return res.status(200).json({
      id: sameData.id,
      firstcheck_id: sameData.firstcheck_id,
      name: sameData.name,
      address: sameData.address,
      billNumber: sameData.bill_number,
      total_price: sameData.total_price,
      rows: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
