const Appoint = require("../model/appoint.model");
const sequelize = require("../config/db.config");
const { QueryTypes } = require("sequelize");
exports.create = async (req, res) => {
  try {
    const data = {
      treat_id: req.body.treat_id,
      date: req.body.date,
    };
    if (!data) {
      return res.status(400).json({ message: "error" });
    }
    await Appoint.create(data).then((success) => {
      if (success) {
        return res.status(201).json(success);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all
exports.getAll = async (req, res) => {
  try {
    // appoints
    const sql = `
       select ap.id, ft.name,ft.tel,ap.date from firstchecks ft 
       inner join appoints ap on ft.id = ap.treat_id
    `
    const data = await sequelize.query(sql,{type:QueryTypes.SELECT})
    if(data.length > 0) {
        return res.status(200).json(data)
    } else {
        return res.status(200).json(data)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update
exports.updateAppoint = async (req, res) => {
  try {
    const { id } = req.params;
    await Appoint.update({ ...req.body }, { where: { id: id } }).then(
      (success) => {
        if (success) {
          return res.status(200).json({ message: "Updated" });
        } else {
          return res.status(400).json({ message: "NOT FOUND DATA TO UPDATE" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// deleted
exports.deleteAppoint = async (req, res) => {
  try {
    const { id } = req.params;
    await Appoint.destroy({ where: { id: id } }).then((deleted) => {
      if (deleted) {
        return res.status(200).json({ message: "Deleted Success" });
      } else {
        return res.status(400).json({ message: "NOT FOUND DATA TO DELETED" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
