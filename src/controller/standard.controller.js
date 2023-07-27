const Standard = require('../model/Standard_value.model');

// create 
exports.create = async (req, res) => {
    try {
       await Standard.create({...req.body}).then((data) => {
        if(data) {
            return res.status(201).json(data)
        }
       }).catch((error) => {
        return res.status(400).json({message:error.message})
       })
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
};
// get data by id
exports.getData_id = async (req, res) => {
    try {
     const {id} = req.params   
     await Standard.findAll({where:{disease_id:id}}).then((data) => {
        if(data.length > 0) {
            return res.status(200).json(data)
        }
     }).catch((error) => {
        return res.status(400).json({message:error.message})
     })
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}