const controller = require('../controller/medicines.type.controller');
module.exports = (app) => {
    app.post("/medicins-type",controller.create)
    app.get("/count",controller.getAll)


}
