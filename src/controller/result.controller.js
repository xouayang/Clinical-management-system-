const Result = require("../model/result.model");
const Bill = require("../model/bill.model");
const SaleDetails = require('../model/saleDetails.model')
const perScripttionDetails = require('../model/prescription_details.model')
const sequelize = require("../config/db.config");
const { QueryTypes } = require("sequelize");
exports.create_result = async (req, res) => {
  try {
    const staff_name = req.payload.NAME;
    const { firstcheck_id, bill_id } = req.body;
    const item = req.body.item;
    let result = [];
    for (let i = 0; i < item.length; i++) {
      await Result.create({
        staff_name: staff_name,
        firstcheck_id: firstcheck_id,
        bill_id: bill_id,
        name: item[i].name,
        details: item[i].details,
        price: item[i].price,
        result: item[i].results,
      })
        .then((data) => {
          result.push(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    await Bill.update({ status: 2 }, { where: { id: bill_id } });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get only bill data
exports.get_only_bill = async (req, res) => {
  try {
    const sql = `select DISTINCT bl.id as bill_id,ft.name,bl.bill_number,bl.status,ft.details,
      bl.total_price,bl.created_at from bills bl 
      inner join treats tr on bl.id = tr.bill_id
      inner join firstchecks ft on bl.firstcheck_id = ft.id
      where bl.status = 2 order by bl.created_at ASC`;

    const data = await sequelize.query(sql, { type: QueryTypes.SELECT })
    return res.json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all result and status 2
exports.get_all_result = async (req, res) => {
  try {
    const {id} = req.params;
    let result = [];
    let sameData;
    const sql = `select DISTINCT bl.id as bill_id,ft.name,bl.bill_number,bl.status,ft.details,
      bl.total_price,rs.result,rs.details as result_details,rs.price,bl.created_at from bills bl 
      inner join treats tr on bl.id = tr.bill_id
      inner join firstchecks ft on bl.firstcheck_id = ft.id
      inner join results rs on bl.id = rs.bill_id
      where bl.id = '${id}' and bl.status = 2 order by bl.created_at ASC`;

    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const data1 = {
          result: data[i].result,
          result_details: data[i].result_details,
          price: data[i].price,
        };
        const rows = {
          bill_id: data[i].bill_id,
          name: data[0].name,
          bill_number: data[0].bill_number,
          details: data[0].details,
          total_price: data[0].total_price,
        };
        result.push(data1);
        sameData = rows;
      }
    }
    return res.status(200).json({
      bill_id:sameData.bill_id,
      name:sameData.name,
      bill_number:sameData.bill_number,
      details:sameData.details,
      total_price:sameData.total_price,
      rows: result,
    });
    // return res.json(data)
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
// get history of result status 3
exports.get_history_result = async (req, res) => {
  try {
    const sql = `select DISTINCT bl.id,ft.name,bl.bill_number,bl.status,ft.details,
     ft.tel, bl.total_price,bl.created_at from bills bl 
      inner join treats tr on bl.id = tr.bill_id
      inner join firstchecks ft on bl.firstcheck_id = ft.id
      where bl.status = 3 order by bl.created_at ASC`;

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
// get all price 
exports.all_price = async (req, res) => {
  try {
    let sum;
    let sum1;
    await Result.findAll().then((data) => {
      let total_price = 0;
      for (let i = 0; i < data.length; i++) {
        total_price = total_price + data[i].price 
      }
       sum = total_price
    }).catch(() => {
      return res.status(200).json("NOT FOUND DATA")
    })
    await SaleDetails.findAll().then((data) => {
      let total = 0
      for (let i = 0; i < data.length; i++) {
           const item = data[i];
           const itemTotal = item.amount * item.price;
           total += itemTotal
      }
       sum1 = total
    }).catch((error) => {
      return res.status(200).json({message:error.message})
    })
     const All_suum = sum + sum1
     return res.status(200).json({total_income:All_suum})
  } catch (error) {
   return res.status(500).json({message:error.message}) 
  }
};
// out come
exports.outCome = async (req, res) => {
  try {
    let sumOutcome ;
    await perScripttionDetails.findAll().then((data) => {
      let outcome = 0;
      for (let i = 0; i < data.length; i++) {
           const item = data[i];
           const itemTotal = item.amount * item.price;
           outcome += itemTotal
      }
      sumOutcome = outcome
    }).catch((error) => {
      return res.status(200).json({message:error.message})
    })
    return res.status(200).json({outcome:sumOutcome})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}
