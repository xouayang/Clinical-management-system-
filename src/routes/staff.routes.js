const controller = require('../controller/staff.controller');
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-staff",controller.create)
    // app.post("/login",controller.sigIn)
    app.post("/signIn", controller.signIn)
    app.get("/get-staff",controller.getAll)
    app.get("/get-staff/:id",controller.singleData)
    app.put("/update-staff/:id",controller.updateData)
    app.delete("/delete-staff/:id",controller.deleteData)
    // app.post("/login",controller.signIn)

}
