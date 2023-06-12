const Suppliers = require("../model/supplier.model")
const Patients = require('../model/patients.model')
exports.create = async (req, res) => {
try {
  await Patients.create({ ...req.body })
  .then((data) => {
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(400).json({ message: "Some thing when wrong" });
  })
  .catch((error) => {
    return res.status(500).json({ message: 'Faild' });
  });
} catch (error) {
  return res.status(500).json({ message: error });
}
};
// get all supplier
exports.getAll = async (req, res) => {
  try {
    await Patients.findAndCountAll().then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get single data 
exports.singleData = async (req, res) => {
    try {
        const {id} = req.params;
        const singleData = await Suppliers.findByPk(id);
        if(singleData) {
            res.json(singleData)
        } else {
            res.json("NOT FOUND DATA ")
        }
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}
// update suppliers
exports.update_data = async (req, res) => {
  try {
    const {id} = req.params;
    const updateData = await Patients.update({...req.body}, {where:{id:id}})
    if(!updateData) {
      return res.status(404).json({message:"NOT FOUND DATA"})
    } else {
      return res.status(200).json({message:"Updated"})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// deltete data 
exports.deleteData = async (req, res) => {
  try {
    const {id} = req.params;
    const deletData = await Patients.destroy({where:{id:id}})
    if(deletData) {
      return res.status(200).json({message:"Deleted"})
    }
    return res.status(404).json({message:"NOT FOUND DATA"})
  } catch (error) {
   return res.status(500).json({message:error.message}) 
  }
}

