const Bill = require("../model/bill.model");
exports.create = async(req, res) => {
 try {
    console.log("H")
 } catch (error) {
  return res.status(500).json({message:error.message})  
 }
};
