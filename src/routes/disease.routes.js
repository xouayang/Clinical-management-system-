const controller = require('../controller/disease.controller');
const upload = require('../helper/upload')
module.exports = (app) => {
    app.post("/create",controller.create)
    // app.get("/get-patients",controller.getAll)
    // app.delete("/delete-patients/:id",controller.deleteData)
    // app.put("/update-patients/:id",controller.update_data)

    // app.get("/patients",controller.getallData)

}
