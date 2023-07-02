const controller = require('../controller/saleDetails.controller');
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-saleDetails",verifyToken,controller.createSaleDetails)
    app.get("/get-offerrId/:id",controller.getOffer)
    app.get("/get-offer-status",controller.get_of_list_order_medicines)

}
