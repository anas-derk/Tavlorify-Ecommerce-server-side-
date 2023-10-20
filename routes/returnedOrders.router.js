const returnedOrdersRouter = require("express").Router();

const returnedOrdersController = require("../controllers/returnedOrders.controller");

returnedOrdersRouter.get("/all-orders", returnedOrdersController.getAllReturnedOrders);

returnedOrdersRouter.post("/create-new-order/:orderId", returnedOrdersController.postNewReturnedOrder);

module.exports = returnedOrdersRouter;