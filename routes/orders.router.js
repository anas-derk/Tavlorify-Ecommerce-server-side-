const ordersRouter = require("express").Router();

const ordersController = require("../controllers/orders.controller");

ordersRouter.get("/all-orders-inside-the-page", ordersController.getAllOrdersInsideThePage);

ordersRouter.get("/orders-count", ordersController.getOrdersCount);

ordersRouter.get("/order-details/:orderId", ordersController.getOrderDetails);

ordersRouter.get("/order-details-from-klarna/:orderId", ordersController.getOrderDetailsFromKlarnaInCheckoutPeriod);

ordersRouter.post("/send-order-to-gelato", ordersController.postNewOrderToGelato);

ordersRouter.post("/send-order-to-klarna", ordersController.postNewOrderToKlarna);

ordersRouter.post("/handle-klarna-checkout-complete/:orderId", ordersController.postKlarnaCheckoutComplete);

ordersRouter.post("/create-new-order", ordersController.postNewOrder);

ordersRouter.put("/update-klarna-order/:orderId", ordersController.putKlarnaOrder);

ordersRouter.put("/update-order/:orderId", ordersController.putOrder);

ordersRouter.put("/products/update-product/:orderId/:productId", ordersController.putOrderProduct);

ordersRouter.delete("/delete-order/:orderId", ordersController.deleteOrder);

ordersRouter.delete("/products/delete-product/:orderId/:productId", ordersController.deleteProductFromOrder);

module.exports = ordersRouter;