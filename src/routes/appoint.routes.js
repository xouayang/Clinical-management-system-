const controller = require('../controller/appoint.controller');
// const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-appointment",controller.create)
    app.get("/get-appointment",controller.getAll)
    app.delete("/delete-appointment/:id",controller.deleteAppoint)
    app.put("/update-appointment",controller.updateAppoint)
    // app.post("/login",controller.sigIn)
    // app.post("/signIn", controller.signIn)
    // app.get("/get-staff",controller.getAll)
    // app.get("/get-staff/:id",controller.singleData)
    // app.put("/update-staff/:id",controller.updateData)
    // app.delete("/delete-staff/:id",controller.deleteData)
    // app.get("/statff-male",controller.genderMale)
    // app.get("/statff-Female",controller.genderFeMale)
    // app.post("/login",controller.signIn)

}
