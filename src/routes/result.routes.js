const controller = require('../controller/result.controller');
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-result",verifyToken,controller.create_result)
    app.get("/get-result",controller.get_all_result)
}
