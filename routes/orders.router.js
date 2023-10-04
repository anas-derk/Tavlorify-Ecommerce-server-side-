const ordersRouter = require("express").Router();

const ordersController = require("../controllers/orders.controller");

ordersRouter.get("/all-orders", ordersController.getAllOrders);

ordersRouter.get("/order-details-from-klarna/:orderId", ordersController.getOrderDetailsFromKlarnaInCheckoutPeriod);

ordersRouter.post("/send-order-to-gelato", ordersController.postNewOrderToGelato);

ordersRouter.post("/send-order-to-klarna", ordersController.postNewOrderToKlarna);

ordersRouter.post("/create-new-order", ordersController.postNewOrder);

ordersRouter.put("/update-klarna-order/:orderId", ordersController.putKlarnaOrder);

module.exports = ordersRouter;