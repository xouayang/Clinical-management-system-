const controller = require('../controller/treat.controller');
module.exports = (app) => {
    app.post("/post-data",controller.create)
    app.get("/bill-data/:id",controller.getToBill)

}
