const controller = require('../controller/bill.controller');
module.exports = (app) => {
    app.post("/create-bill",controller.create)
    app.get("/get-bill",controller.dataBill)
    app.get("/status-zero",controller.statusZero)
    app.put("/update-bill/:id",controller.updatBill)
}
