const controller = require('../controller/medicines.controller');
module.exports = (app) => {
    app.post("/medicins",controller.create)
    app.put("/update-medicins/:id",controller.updateData)
    app.get("/get-medicins",controller.getAll)
    app.get("/get-id/:id",controller.getBy_id)
    app.post("/createOffer",controller.createOffer)
    app.get("/getMedicines",controller.getMedicinesType)
    app.get("/report-medicines",controller.reportData)
    app.delete("/delete-medicines-data/:id",controller.deleteData)
}