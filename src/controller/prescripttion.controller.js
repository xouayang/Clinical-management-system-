const PrescriptionDeails = require("../model/prescription_details.model");
const Prescription = require("../model/prescription.model");
const { billNumber } = require("../helper/randonBill");
const sequelize = require("../config/db.config");
const { QueryTypes,Op } = require("sequelize");
const moment = require("moment");
const Sale_details = require("../model/saleDetails.model");
// create data
exports.create = async (req, res) => {
  const bill = billNumber();
  try {
    const item = req.body.item;
    const staff_id = req.payload.ID;
    const { supplier_id } = req.body;
    let successed = [];
    const data = {
      staff_id: staff_id,
      supplier_id: supplier_id,
      bill_number: bill,
    };
    await Prescription.create(data).then(async (result) => {
      if (result) {
        for (let i = 0; i < item.length; i++) {
          await PrescriptionDeails.create({
            prescription_id: result.id,
            bill_number: result.bill_number,
            medicines_id: item[i].medicines_id,
            name: item[i].name,
            amount: item[i].amount,
            price: item[i].price,
            unit: item[i].unit,
            type_name: item[i].type_name,
          }).then((success) => {
            successed.push(success);
          });
        }
      }
    });
    return res.status(201).json(successed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get history of prescription
exports.get_history_prescription = async (req, res) => {
  try {
    const sql = `
    select DISTINCT pdt.bill_number,sp.supplier_name,pdt.create_at,st.name as staff_name,pt.status from prescriptions pt 
    inner join suppliers sp on pt.supplier_id = sp.id
    inner join staffs st on pt.staff_id = st.id
    inner join prescription_details pdt on pt.id = pdt.prescription_id
    order by pdt.create_at DESC
 `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data.length > 0) {
      return res.status(200).json(data)
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get by bill_number
exports.get_by_bill_number  = async (req, res) => {
  try {
    const {bill_number} = req.params;
    let rows = [];
    let result;
    let sum = 0;
    const sql = `
       select DISTINCT pdt.bill_number,pdt.type_name,pdt.name,pdt.amount,pdt.price,pdt.unit
       ,sp.supplier_name,pdt.create_at,st.name as staff_name,pt.status from prescriptions pt 
       inner join suppliers sp on pt.supplier_id = sp.id
       inner join staffs st on pt.staff_id = st.id
       inner join prescription_details pdt on pt.id = pdt.prescription_id
       where pdt.bill_number = '${bill_number}'
       order by pdt.create_at ASC
    `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
       const dataInside = {
        type_name:data[i].type_name,
        name:data[i].name,
        amount:data[i].amount,
        price:data[i].price,
        create_at:data[i].create_at
       }
       const outsideData = {
        bill_number:data[i].bill_number,
        supplier_name:data[i].supplier_name,
        staff_name:data[i].staff_name,
       }
       const item = data[i];
       const total_price = item.amount * item.price;
       sum += total_price
        rows.push(dataInside);
        result = outsideData
      }
      return res.status(200).json({
        bill_number:result.bill_number,
        supplier_name:result.supplier_name,
        staff_name:result.staff_name,
        sum:sum,
        rows:rows
      })
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
// report outcome
exports.outcome = async (req, res) => {
  try {
    const startDate = req.query.start;
    const endDate = req.query.end;
    let result = [];
    let sum = 0;
    let formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    let formattedEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");
    let con = "";
    if (startDate && endDate) {
      con +=
        " DATE(prd.create_at) BETWEEN '" +
        formattedStartDate +
        "' AND '" +
        formattedEndDate +
        "' ";
    }

    const sql =
      `select prd.name,prd.type_name, prd.amount,prd.price, prd.create_at from prescriptions pr 
      inner join prescription_details prd on pr.id = prd.prescription_id
      Where` + con;
    const prescription = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    for (let i = 0; i < prescription.length; i++) {
      const insideData = {
        name: prescription[i].name,
        type_name: prescription[i].type_name,
        amount: prescription[i].amount,
        price: prescription[i].price,
        create_at: prescription[i].create_at,
      };
      const item = prescription[i];
      const itemTotal = item.amount * item.price;
      sum += itemTotal;
      result.push(insideData);
    }
    res.json({ sum: sum, rows: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// income
exports.income = async (req, res) => {
  try {
    const startDate = req.query.start;
    const endDate = req.query.end;
    let result = [];
    let sum = 0;
    let formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    let formattedEndDate = moment(endDate).add(1, "days").format("YYYY-MM-DD");
    let con = "";
    if (startDate && endDate) {
      con +=
        " DATE( sd.date) BETWEEN '" +
        formattedStartDate +
        "' AND '" +
        formattedEndDate +
        "' ";
    }

    await Sale_details.findAll({
      where: {
        createdAt: { [Op.between]: [formattedStartDate, formattedEndDate] },
      },
    }).then((data) => {
      if(data.length>0) {
       for (let i = 0; i < data.length; i++) {
        const insideData = {
          name:data[i].name,
          amount:data[i].amount,
          price:data[i].price,
          createdAt:data[i].createdAt
        }
        const item = data[i];
        const itemTotal = item.amount * item.price;
        sum += itemTotal;
        result.push(insideData)
       }  
      }
      return res.status(200).json({sum:sum,rows:result})
    }).catch((error) => {
      return res.status(200).json({message:error.message})
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get status
exports.get_history_prescription_status = async (req, res) => {
  try {
    const sql = `
    select DISTINCT pdt.bill_number,sp.supplier_name,pdt.create_at,st.name as staff_name,pt.status from prescriptions pt 
    inner join suppliers sp on pt.supplier_id = sp.id
    inner join staffs st on pt.staff_id = st.id
    inner join prescription_details pdt on pt.id = pdt.prescription_id
    where pt.status = 1
    order by pdt.create_at ASC
 `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data.length > 0) {
      return res.status(200).json(data)
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
