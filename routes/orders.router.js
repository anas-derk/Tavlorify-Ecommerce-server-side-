const ordersRouter = require("express").Router();

const ordersController = require("../controllers/orders.controller");

ordersRouter.get("/all-orders", ordersController.getAllOrders);

ordersRouter.get("/order-details/:orderId", ordersController.getOrderDetails);

ordersRouter.get("/order-details-from-klarna/:orderId", ordersController.getOrderDetailsFromKlarnaInCheckoutPeriod);

ordersRouter.post("/send-order-to-gelato", ordersController.postNewOrderToGelato);

ordersRouter.post("/send-order-to-klarna", ordersController.postNewOrderToKlarna);

ordersRouter.post("/handle-klarna-checkout-complete/:orderId", ordersController.postKlarnaCheckoutComplete);

ordersRouter.post("/create-new-order", ordersController.postNewOrder);

ordersRouter.put("/update-klarna-order/:orderId", ordersController.putKlarnaOrder);

ordersRouter.put("/update-order/:orderId", ordersController.putOrder);

module.exports = ordersRouter;