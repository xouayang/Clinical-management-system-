const controller = require('../controller/firstcheck.controller');
module.exports = (app) => {
    app.post("/create-firstCheck",controller.create)

}
