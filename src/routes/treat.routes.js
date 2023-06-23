const controller = require('../controller/treat.controller');
module.exports = (app) => {
    app.get("/get-data",controller.getAll)
    app.post("/post-data",controller.create)
    app.get("/bill-data/:id",controller.getToBill)

}
