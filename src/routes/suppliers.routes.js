const controller = require('../controller/suppliers.controller');
module.exports = (app) => {
    app.post("/create-suppliers",controller.create)
    app.get("/get-suppliers",controller.getAll)
    app.get("/get-single/:id",controller.singleData)
    app.put("/update-suppliers/:id",controller.update_data)
    app.delete("/delete-suppliers/:id",controller.deleteData)
    // app.post("/login",controller.signIn)

}
