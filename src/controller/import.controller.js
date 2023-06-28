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
    const { expire_date } = req.body;
    const item = req.body.item;
    const staff_id = req.payload.ID;
    let result = [];
    let id = "";
    let Status;
    const data = {
      staff_id: staff_id,
      bill_number: item[0].bill_number,
      prescription_id: item[0].prescription_id,
    };
    // await Prescription.findAndCountAll().then((data) => {
    //   if (data.rows) {
    //     Status = data.rows[0].status;
    //   }
    // });
    // if (Status == 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "ລະຫັດໃບບິນນີ້ໄດ້ນຳເຂົ້າກ່ອນໜ້ານີເເລ້ວ" });
    // }
    await Import.create(data).then(async (success) => {
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
            expire_date: expire_date,
            medicines_id: item[i].medicines_id,
            name: item[i].name,
            price: item[i].price,
            amount: item[i].amount,
            price: item[i].price,
            type_name: item[i].type_name,
            unit: item[i].unit,
          }).then((data) => {
            result.push(data);
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
