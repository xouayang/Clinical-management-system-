const controller = require('../controller/result.controller');
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-result",verifyToken,controller.create_result)
    app.get("/get-result/:id",controller.get_all_result)
    // app.get("/get-result/:id",controller.get_data_by_id)
    app.get("/dataResult",controller.dataResult)
    app.get("/history-result",controller.get_history_result)
    app.get("/all-history-result",controller.get_history_result1)
    app.get("/only-bill",controller.get_only_bill)
    app.get("/price",controller.all_price)
    app.get("/outcome",controller.outCome)
    
}
