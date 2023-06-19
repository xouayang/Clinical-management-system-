const controller = require('../controller/treat.controller');
module.exports = (app) => {
    app.get("/get-data",controller.getAll)
    // app.get("/get-patients",controller.getAll)
    // app.delete("/delete-patients/:id",controller.deleteData)
    // app.put("/update-patients/:id",controller.update_data)

    // app.get("/patients",controller.getallData)

}
