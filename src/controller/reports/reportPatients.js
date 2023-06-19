const Patients = require("../../model/patients.model");

// reports Patients
exports.reportsPatients = async (req, res) => {
  try {
    const search_date = req.query.search_date;
    await Patients.findAll({ where: { createdAt: search_date } }).then(
      (data) => {
        if (!data) {
          return res.status(404).json({ message: "NOT FOUND DATA" });
        } else {
          return res.status(200).json(data);
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// reportsAll patients
exports.reportAll = async (req, res) => {
    try {
        const allData = await Patients.findAndCountAll()
        if(allData.rows.length > 0) {
            return res.status(200).json(allData.rows)
        } else {
            return res.status(404).json({message:"NOT FOUND DATA"})
        }
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}