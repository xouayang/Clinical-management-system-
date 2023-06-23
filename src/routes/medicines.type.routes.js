const controller = require('../controller/medicines.type.controller');
module.exports = (app) => {
    app.post("/medicins-type",controller.create)
    // app.get("/get-all",controller.getAll)
    // app.put("/update/:id",controller.updateData)
    // // app.delete("/delete/:id",controller.deleteData)
    // app.delete('/delete/:id', controller.deleteData)

    // app.get("/patients",controller.getallData)

}
