const controller = require('../controller/prescripttion.controller');
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-prescription",verifyToken,controller.create)
    app.get("/get-prescriptions",controller.get_history_prescription)
    app.get("/prescription_status",controller.prescription_status)
    app.put("/update-prescriptions/:id",controller.update_prescription_status)
    app.get("/get-outcome",controller.outcome)
    app.get("/get-income",controller.income)
    app.get("/get-by-bill/:bill_number",controller.get_by_bill_number)
    app.get("/get-prescription-status",controller.get_history_prescription_status)
    
}
