const Staffs = require("../model/staff.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.create = async (req, res) => {
try {
  const {name,gender, tel, password, address,position} = req.body;
  if(!name || !gender || !tel || !password || !address || !position) {
    return res.status(400).json({message:"the body is not empty"})
  }
  const salt = await bcrypt.genSalt(10);
  const hashPw = await bcrypt.hash(password,salt)
  const newData = {
    name:name,
    gender:gender,
    tel:tel,
    password:hashPw,
    address:address,
    position:position
  }
  await Staffs.create(newData).then((data) => {
    if(!data) {
      return res.status(400).json({message:"Faild"})
    } else {
      return res.status(201).json(data)
    }
  })
} catch (error) {
  return res.status(500).json({message:error.message})
}
};
// login for staff 
exports.signIn = async(req, res) => {
  try {
    const {tel, password} = req.body;
    if(!tel || !password) {
      return res.status(400).json({message:"Tel or password is wrong"})
    }
    await Staffs.findOne({where:{tel:tel}}).then( async (data) => {
      const validatePassword = await bcrypt.compare(password,data.password)
     if(validatePassword) {
      const statffData = {
        ID : data.id,
        NAME: data.name,
        GENDER : data.gender,
        TEL : data.tel,
        ADDRESS : data.address,
        POSITION: data.position,
        ROLE:data.role
      }
      const token = await jwt.sign(statffData,"CLINIC", {expiresIn:"120d"});
      return res.status(201).json({result:"Success", token:token})
     } else {
      return res.status(400).json({message:"Login Failed"})
     }
    })
    
  } catch (error) {
   return res.status(500).json({message:error.message}) 
  }
}
// get all data staff
exports.getAll = async (req, res) => {
  try {
   await Staffs.findAndCountAll().then((data) => {
    if(!data) {
        return res.status(404).json({message:"NOT FOUND DATA"})
    } else {
        return res.status(200).json(data)
    }
   })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};
// get singel data
exports.singleData = async (req, res) => {
    try {
       const {id} = req.params;
       const singel_data = await Staffs.findOne({where:{id:id}});
       if(singel_data) {
        return res.status(200).json(singel_data)
       } else {
        return res.status(404).json({message:"NOT FOUND DATA"})
       } 
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}
// update data 
exports.updateData = async (req,res) => {
    try {
     const {id} = req.params;
     const updateData = await Staffs.update({...req.body},{where:{id:id}}) 
     if(updateData) {
        return res.status(200).json({message:"Updated"})
     } else {
        return res.status(404).json({message:"NOT FOUND DATA"})
     } 
    } catch (error) {
      return res.status(500).json({message:error.message})  
    }
}
// delete data 
exports.deleteData = async (req, res) => {
    try {
      const {id} = req.params;
      const deleteData = await Staffs.destroy({where:{id:id}}) 
      if(deleteData){
        return res.status(200).json({message:"Deleted"})
      } else {
        return res.status(404).json({message:"NOT FOUND DATA"})
      }
    } catch (error) {
    return res.status(500).json({message:error.message})    
    }
}

