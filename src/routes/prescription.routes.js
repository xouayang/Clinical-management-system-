const controller = require('../controller/prescripttion.controller');
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-prescription",verifyToken,controller.create)
    app.get("/get-prescriptions",controller.get_history_prescription)
    
}
