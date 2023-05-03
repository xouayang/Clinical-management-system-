const controller = require('../controller/firstcheck.controller');
const upload = require('../helper/upload')
module.exports = (app) => {
    app.post("/create-firstCheck",controller.create)
    // app.get("/get-patients",controller.getAll)
    // app.delete("/delete-patients/:id",controller.deleteData)
    // app.put("/update-patients/:id",controller.update_data)

    // app.get("/patients",controller.getallData)

}
