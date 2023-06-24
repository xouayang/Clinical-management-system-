const controller = require('../controller/saleDetails.controller');
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
    app.post("/create-saleDetails",verifyToken,controller.createSaleDetails)
    app.get("/get-offerrId/:id",controller.getOffer)

}
