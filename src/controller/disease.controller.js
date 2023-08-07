const Disease = require("../model/Disease.model");
exports.create = async(req, res) => {
  try {
      const {name, price} = req.body;
      if(!name || !price) {
        return res.status(400).json({message:"all field is required"})
      }
      const insertData = {name:name, price:price}
    await Disease.create(insertData).then((data) => {
       if(data) {
        return res.status(201).json(data)
       }
    }).catch((error) => {
      return res.status(404).json({message:error.message})
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all disease 
exports.getAll = async (req, res) => {
  try {
  Disease.findAndCountAll().then((data) => {
    if(data.rows.length > 0) {
      return res.status(200).json(data)
    } else {
      return res.status(200).json({message:"NOT FOUND DATA"})
    }
  }).catch((error) => {
    return res.status(400).json({message:error.message})
  })    
  } catch (error) {
  return res.status(500).json({message:error.message})  
  }
}
// update disase 
exports.updateData = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id)

    await Disease.update({...req.body},{where:{disease_id:id}}).then((completed) => {
      if(completed) {
        return res.status(200).json({message:"Updated"})
      } else {
        return res.status(404).json({message:"NOT FOUND DATA TO UPDATE"})
      }
    }).catch((error) => {
      return res.status(400).json({message:error.message})
    })

  } catch (error) {
   return res.status(500).json({message:error.message}) 
  }
}
// delete disease 
exports.deleteData = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteData = await Disease.destroy({where:{disease_id:id}}) 
      if(deleteData) {
        return res.status(200).json({message:"Deleted"})
      } else {
        return res.status(404).json({message:"NOT FOUND DATA TO DELETE"})
      }
    
  } catch (error) { 
    return res.status(500).json({message:error.message})
  }
}