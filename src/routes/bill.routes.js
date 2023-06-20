const controller = require('../controller/bill.controller');
const upload = require('../helper/upload')
module.exports = (app) => {
    app.post("/create",controller.create)
    // app.get("/get-all",controller.getAll)
    // app.put("/update/:id",controller.updateData)
    // // app.delete("/delete/:id",controller.deleteData)
    // app.delete('/delete/:id', controller.deleteData)

    // app.get("/patients",controller.getallData)

}
