const returnedOrdersRouter = require("express").Router();

const returnedOrdersController = require("../controllers/returnedOrders.controller");

returnedOrdersRouter.get("/all-orders", returnedOrdersController.getAllReturnedOrders);

returnedOrdersRouter.get("/order-details/:orderId", returnedOrdersController.getReturnedOrderDetails);

returnedOrdersRouter.post("/create-new-order/:orderId", returnedOrdersController.postNewReturnedOrder);

returnedOrdersRouter.put("/update-order/:orderId", returnedOrdersController.putReturnedOrder);

returnedOrdersRouter.put("/products/update-product/:orderId/:productId", returnedOrdersController.putReturnedOrderProduct);

returnedOrdersRouter.delete("/delete-order/:orderId", returnedOrdersController.deleteReturnedOrder);

returnedOrdersRouter.delete("/products/delete-product/:orderId/:productId", returnedOrdersController.deleteProductFromReturnedOrder);

module.exports = returnedOrdersRouter;