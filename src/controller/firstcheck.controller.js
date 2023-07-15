const FirstCheck = require("../model/firstCheck.model");
const sequelize = require("../config/db.config");
const { QueryTypes } = require("sequelize");
exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "can't be blank" });
    }
    await FirstCheck.create({ ...req.body }).then((data) => {
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all data
exports.getAll = async (req, res) => {
  try {
    await FirstCheck.findAndCountAll({ where: { status: 1 } }).then((data) => {
      if (!data) {
        return res.status(200).json(data);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all data where status 0
exports.reportData = async (req, res) => {
  try {
    await FirstCheck.findAndCountAll({ where: { status: 0 } }).then((data) => {
      if (!data) {
        return res.status(200).json(data);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get single data by id
exports.singleData = async (req, res) => {
  try {
    const { id } = req.params;
    const singleData = await FirstCheck.findOne({ where: { id: id } });
    if (!singleData) {
      return res.status(404).json({ message: "NOT FOUND DATA" });
    }
    return res.status(200).json(singleData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await FirstCheck.destroy({ where: { id: id } });
    if (deleteData) {
      return res.status(200).json({ message: "Deleted" });
    }
    return res.status(404).json({ message: "NOT FOUND DATA" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update data
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = await FirstCheck.update(
      { ...req.body },
      { where: { id: id } }
    );
    if (!updateData) {
      return res.status(404).json({ message: "NOT FOUND DATA" });
    }
    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// history of patients
exports.history_patients = async (req, res) => {
  try {
    const { tel } = req.params;
    let result = [];
    let rows;
    const sql = `select DISTINCT bl.id,ft.name as firstcheck_name,bl.bill_number,bl.status,ft.details,
      ft.tel,dis.name,dis.price, bl.total_price,bl.created_at from bills bl 
      inner join treats tr on bl.id = tr.bill_id
      inner join diseases dis on tr.disease_id = dis.disease_id
      inner join firstchecks ft on bl.firstcheck_id = ft.id
      where ft.tel = '${tel}' and bl.status = 3 order by bl.created_at ASC`;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
         const outSide_data = {
          id:data[i].id,
          firstcheck_name:data[0].firstcheck_name,
          bill_number:data[0].bill_number,
          status:data[0].status,
          tel:data[0].tel,
          details:data[0].details,
          total_price:data[0].total_price,
          created_at:data[0].created_at,
         }
         const inside_data = {
          name:data[i].name,
          price:data[i].price,
          // result:data[i].result
         } 
        result.push(inside_data);
        rows = outSide_data
      }
      return res.status(200).json({
        id:rows.id,
        firstcheck_name:rows.firstcheck_name,
        bill_number:rows.bill_number,
        status:rows.status,
        tel:rows.tel,
        details:rows.details,
        total_price:rows.total_price,
        created_at : rows.created_at,
        rows:result

      })
    }
      return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
