const controller = require('../controller/saleDetails.controller');
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-saleDetails",verifyToken,controller.createSaleDetails)
    app.get("/get-offerrId/:id",controller.getOffer)
    app.get("/get-offer-status",controller.get_of_list_order_medicines)
    app.get("/get-offer-status1",controller.get_of_list_order_medicines_status1)
    app.get("/get-offer-status/:id",controller.get_of_list_by_id)
    app.put("/update-medicines-status/:id",controller.updateStatus)

}
