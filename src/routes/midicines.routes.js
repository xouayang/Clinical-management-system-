const controller = require('../controller/medicines.controller');
module.exports = (app) => {
    app.post("/medicins",controller.create)
    app.get("/get-medicins",controller.getAll)
    app.get("/get-id/:id",controller.getBy_id)
    app.post("/createOffer",controller.createOffer)

}
