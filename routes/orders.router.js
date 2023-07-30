const ordersRouter = require("express").Router();

const ordersController = require("../controllers/orders.controller");

ordersRouter.get("/all-orders", ordersController.getAllOrders);

ordersRouter.get("/all-user-orders", ordersController.getAllOrdersForUser);

ordersRouter.post("/send-order-to-gelato", ordersController.postNewOrderToGelato);

ordersRouter.post("/add-new-order", ordersController.postNewOrderToGelato);

module.exports = ordersRouter;