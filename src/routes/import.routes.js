const controller = require('../controller/import.controller');
const { verifyToken } = require('../middleware/verifyToken');
module.exports = (app) => {
    app.get("/getPriscriptions/:id",controller.getPrecription)
    app.post("/createImport",verifyToken,controller.createImport)
    app.get("/get-import-history",controller.get_history_import)
    app.get("/get-import-history-status",controller.get_history_import_status)
    app.get("/more-details",controller.get_by_id)

}
