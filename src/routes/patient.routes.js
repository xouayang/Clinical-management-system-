const controller = require('../controller/patient.controller');
module.exports = (app) => {
    app.post("/create-patients",controller.create)
    app.get("/get-patients",controller.getAll)
    app.get("/get-status",controller.getAll_byStatus)
    app.delete("/delete-patients/:id",controller.deleteData)
    app.put("/update-patients/:id",controller.update_data)
    app.get("/statusZero",controller.getStatusZero)

    // app.get("/patients",controller.getallData)

}
