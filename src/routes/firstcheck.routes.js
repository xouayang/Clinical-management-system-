const controller = require('../controller/firstcheck.controller');
module.exports = (app) => {
    app.post("/create-firstCheck",controller.create)
    app.get("/get-firstCheck",controller.getAll)
    app.get("/get-report",controller.reportData)
    app.get("/history-patient/:tel",controller.history_patients)

}
