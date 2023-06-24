const controller = require('../controller/bill.controller');
const upload = require('../helper/upload')
module.exports = (app) => {
    app.post("/create-bill",controller.create)

}
