const Import = require("../model/import.model");
const ImportDetails = require("../model/importDetails.model");
const PrescriptionDeails = require("../model/prescription_details.model");
const Prescription = require("../model/prescription.model");
const sequelize = require("../config/db.config");
const { QueryTypes } = require("sequelize");
const Medicines = require("../model/Medicines.model");
// get data for precription
exports.getPrecription = async (req, res) => {
  try {
    const { id } = req.params;
    await PrescriptionDeails.findAndCountAll({
      where: { bill_number: id },
    }).then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// create data
exports.createImport = async (req, res) => {
  try {
    // const { expire_date } = req.body;
    const item = req.body.item;
    const staff_id = req.payload.ID;
    let result = [];
    let id = "";
    const data = {
      staff_id: staff_id,
      bill_number: item[0].bill_number,
      prescription_id: item[0].prescription_id,
    };

    await Import.create(data).then(async (success) => {
      // console.log(data)
      if (success) {
        id = success.prescription_id;
        for (let i = 0; i < item.length; i++) {
          await Medicines.increment("amount", {
            by: item[i].amount,
            where: {
              medicines_id: item[i].medicines_id,
            },
          });
          await ImportDetails.create({
            import_id: success.id,
            expire_date: item[i].expire_date,
            medicines_id: item[i].medicines_id,
            name: item[i].name,
            price: item[i].price,
            amount: item[i].amount,
            price: item[i].price,
            type_name: item[i].type_name,
            unit: item[i].unit,
          })
            .then((data) => {
              result.push(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
    await Prescription.update({ status: 0 }, { where: { id: id } });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get history of import
exports.get_history_import = async (req, res) => {
  try {
    const sql = `
     select its.bill_number,itd.type_name,itd.name as primacy_name,
     itd.amount,itd.price,itd.unit,itd.expire_date, st.name from imports its 
     inner join import_details itd on its.id = itd.import_id
     inner join staffs st on its.staff_id = st.id 
    `;
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
exports.get_history_import_status = async (req, res) => {
  try {
    const sql = `
     select pt.bill_number  from prescriptions pt
     where pt.status = 1
   `;
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
// get by id
exports.get_by_id = async (res, req) => {
  try {
    const { bill_number } = req.params;
    // where its.bill_number= '${bill_number}'
    const sql = `
     select * from imports
    `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT })
    .then((data) => {
      return res.status(200).json(data)
    }).catch((error) => {
      console.log(error)
      return res.status(200).json({message:error.message})
    })
    // if (data.length > 0) {
    //   return res.status(200).json(data);
    // } else {
    //   return res.status(200).json("error");
    // }
  } catch (error) {}
};
