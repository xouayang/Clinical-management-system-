const Disease = require("../model/Disease.model");

exports.create = (req, res) => {
  try {
    Disease.create({ ...req.body })
      .then((data) => {
        if (data) {
          return res.status(200).json(data);
        }
        return res.status(400).json({ message: "Some thing when wrong" });
      })
      .catch((error) => {
        return res.status(500).json({ message: error });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};