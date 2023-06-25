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
    const data = {
      staff_id: staff_id,
      bill_number: item[0].bill_number,
    };
    await Import.create(data).then(async (success) => {
      if (success) {
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
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
