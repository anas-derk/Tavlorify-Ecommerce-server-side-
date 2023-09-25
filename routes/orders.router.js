const ordersRouter = require("express").Router();

const ordersController = require("../controllers/orders.controller");

ordersRouter.get("/all-orders", ordersController.getAllOrders);

ordersRouter.get("/all-user-orders", ordersController.getAllOrdersForUser);

ordersRouter.get("/order-details-from-klarna/:orderId", ordersController.getOrderDetailsFromKlarna);

ordersRouter.post("/send-order-to-gelato", ordersController.postNewOrderToGelato);

ordersRouter.post("/send-order-to-klarna", ordersController.postNewOrderToKlarna);

ordersRouter.put("/update-order/:orderId", ordersController.putOrder);

module.exports = ordersRouter;