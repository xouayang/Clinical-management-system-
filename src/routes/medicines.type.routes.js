const controller = require('../controller/medicines.type.controller');
module.exports = (app) => {
    app.post("/medicins-type",controller.create)
    app.get("/count",controller.getAll)
    app.delete("/delete-type/:id",controller.deleteData)
    app.put("/update-type/:id",controller.updateData)


}
