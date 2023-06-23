const Medicines_Type = require("../model/medicines.type");
exports.create = async (req, res) => {
  try {
    await Medicines_Type.create({ ...req.body }).then((data) => {
      if (data) {
        return res.status(201).json(data);
      }
      return res.status(400).json({ message: "error" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    await Medicines_Type.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(201).json(data);
      }
      return res.status(400).json({ message: "error" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    await Medicines_Type.update({ ...req.body }, { where: { id: id } }).then(
      (success) => {
        return res.json({ message: "Updated" });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await Medicines_Type.destroy({ where: { id: id } }).then((deleted) => {
      if (deleted) {
        return res.json({ message: "Updated" });
      } else {
        return res.status(400).json({ message: "error" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
