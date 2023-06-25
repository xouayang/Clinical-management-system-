const controller = require('../controller/import.controller');
const { verifyToken } = require('../middleware/verifyToken');
module.exports = (app) => {
    app.get("/getPriscriptions/:id",controller.getPrecription)
    app.post("/createImport",verifyToken,controller.createImport)

}
