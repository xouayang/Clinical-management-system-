const controller = require('../controller/reports/reportPatients');
module.exports = (app) => {
    // app.post("/create",controller.create)
    app.get("/reports",controller.reportAll)
    app.get("/reports/date",controller.reportsPatients)
    // app.put("/update/:id",controller.updateData)
    // app.delete("/delete/:id",controller.deleteData)
    // app.delete('/delete/:id', controller.deleteData)

    // app.get("/patients",controller.getallData)

}
