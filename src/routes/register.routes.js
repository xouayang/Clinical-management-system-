const controller = require('../controller/register.controller');
module.exports = (app) => {
    app.post("/register",controller.singUp)
    app.post("/login",controller.signIn)

}
