const FirstCheck = require("../model/firstCheck.model");
exports.create = async (req, res) => {
  try {
    if(!req.body) {
      return res.status(400).json({message:"can't be blank"})
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
    await FirstCheck.findAndCountAll({where:{status:1}}).then((data) => {
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
    await FirstCheck.findAndCountAll({where:{status:0}}).then((data) => {
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
