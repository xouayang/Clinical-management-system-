const Treat = require("../model/treat.model");
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const moment = require("moment");
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
          return res.status(404).json({ message: err.message });
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
    select DISTINCT bl.id,ft.id as first_id,ft.create_at,ds.disease_id,ds.price,ts.details,
    ts."createdAt" as date, bl.total_price,bl.bill_number,ft.name,ft.address,
    ft.tel from treats ts
    inner join bills bl on ts.bill_id = bl.id
    inner join firstchecks ft on bl.firstcheck_id = ft.id
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
        tel: data[0].tel,
        bill_number: data[0].bill_number,
        total_price: data[0].total_price,
        create_at: data[0].create_at,
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
      tel: sameData.tel,
      billNumber: sameData.bill_number,
      total_price: sameData.total_price,
      create_at: sameData.create_at,
      rows: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get report treats
exports.report_treats = async (req, res) => {
  try {
    const startDate = req.query.start;
    const endDate = req.query.end;
    let formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    let formattedEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");
    let con = "";
    if (startDate && endDate) {
      con +=
        " DATE(ft.create_at) BETWEEN '" +
        formattedStartDate +
        "' AND '" +
        formattedEndDate +
        "' ";
    }
    const sql = `
    select ft.name,ft.address,ft.tel,ft.create_at,ds.name as disase_name,ds.price from firstchecks ft 
    inner join bills bl on ft.id = bl.firstcheck_id
    inner join treats tr on bl.id = tr.bill_id
    inner join diseases ds on tr.disease_id = ds.disease_id
    where ${con}`;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    let total = 0;
      data.forEach(item => {
        total += item.price; 
      });
    return res.status(200).json({
      total_price:total,
      rows:data
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
