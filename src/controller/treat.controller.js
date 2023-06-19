
const Treat = require("../model/treat.model");
const {QueryTypes} = require('sequelize')
const sequelize = require('../config/db.config')
// get all treat
exports.getAll = async (req, res) => {
    try {
       const sql = `select ft.id as firstCheckId,pt.id as patients_id, pt.name,pt.address,pt.tel,pt.details,ft.weight,ft.height  from patients pt
       inner join firstchecks ft on pt.id = ft.patients_id`
       const data = await sequelize.query(sql, { type: QueryTypes.SELECT })
       return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({message:error.message})  
    }
}


exports.create = (req, res) => {
try {
  Treat.create({ ...req.body })
  .then((data) => {
    if (data) {
      return res.status(200).json({ result: data });
    }
    return res.status(400).json({ message: "Some thing when wrong" });
  })
  .catch((error) => {
    return res.status(500).json({ message: "FAILED" });
  });
} catch (error) {
  return res.status(500).json({ message: error });
}
};

// get all supplier
// exports.getAll = async (req, res) => {
//   try {
//     await Suppliers.findAndCountAll().then((data) => {
//       return res.status(200).json(data);
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// // get single data 
// exports.singleData = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const singleData = await Suppliers.findByPk(id);
//         if(singleData) {
//             res.json(singleData)
//         } else {
//             res.json("NOT FOUND DATA ")
//         }
//     } catch (error) {
//      return res.status(500).json({message:error.message})   
//     }
// }
// // update suppliers
// exports.update_data = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = {
//       supplier_name: req.body.supplier_name,
//       supplier_tel: req.body.supplier_tel,
//       supplier_address: req.body.supplier_address,
//     };
//     const update = await Suppliers.findByPk(id);
//     if (update) {
//       (update.supplier_name = data.supplier_name),
//         (update.supplier_tel = data.supplier_tel),
//         (update.supplier_address = data.supplier_address),
//         await update.save();
//       res.json("Success");
//     } else {
//       res.json("NOT SUCESS");
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// // delete data 
// exports.deleteData = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const deleted = await Suppliers.destroy({where:{id:id}})
//     if(deleted) {
//       return res.status(200).json("Deleted")
//     } else {
//       return res.status(404).json({message:"NOT FOUND DATA"})
//     }
//   } catch (error) {
//     return res.status(500).json({message:error.message})
//   }
// }

