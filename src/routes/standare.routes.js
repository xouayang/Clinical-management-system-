const controller = require('../controller/standard.controller');
module.exports = (app) => {
    app.post("/create-standare",controller.create);
    app.get("/get-standare/:id",controller.getData_id);

    // app.post("/login",controller.signIn)

}
