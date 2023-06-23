const Appoint = require("../model/appoint.model");
exports.create = async(req, res) => {
 try {
    const data = {
        treat_id : req.body.treat_id,
        noffAppoint:req.body.noffAppoint
    }
     await Appoint.create(data).then((success) => {
      if(success) {
         return res.status(201).json(success)
      }
    })
 } catch (error) {
  return res.status(500).json({message:error.message})  
 }
};
// get all 
exports.getAll = async (req, res) =>{
   try {
      await Appoint.findAndCountAll().then((data) => {
         if(data.rows.length > 0) {
            return res.status(200).json(data)
         }
         return res.status(400).json({message:'NOT FOUND DATA'})
      })
   } catch (error) {
      return res.status(500).json({message:error.message}) 
      
   }
}
// update 
exports.updateAppoint = async(req, res) => {
    try {
        const {id} = req.params
        await Appoint.update({...req.body}, {where:{id:id}}).then((success) => {
            if(success) {
                return res.status(200).json({message:'Updated'})
            } else {
                return res.status(400).json({message:"NOT FOUND DATA TO UPDATE"})
            }
        })
        
    } catch (error) {
       return res.status(500).json({message:error.message}) 
    }
}
// deleted
exports.deleteAppoint = async (req, res) => {
    try {
        const {id} = req.params;
        await Appoint.destroy({where:{id:id}}).then((deleted) => {
            if(deleted) {
                return res.status(200).json({message:"Deleted Success"})
            } else {
                return res.status(400).json({message:'NOT FOUND DATA TO DELETED'})
            }
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
