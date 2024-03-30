const returnedOrdersRouter = require("express").Router();

const returnedOrdersController = require("../controllers/returnedOrders.controller");

const { validateJWT } = require("../middlewares/global.middlewares");

returnedOrdersRouter.get("/all-orders-inside-the-page", returnedOrdersController.getAllReturnedOrdersInsideThePage);

returnedOrdersRouter.get("/orders-count", returnedOrdersController.getReturnedOrdersCount);

returnedOrdersRouter.get("/order-details/:orderId", returnedOrdersController.getReturnedOrderDetails);

returnedOrdersRouter.post("/create-new-order/:orderId", validateJWT, returnedOrdersController.postNewReturnedOrder);

returnedOrdersRouter.put("/update-order/:orderId", validateJWT, returnedOrdersController.putReturnedOrder);

returnedOrdersRouter.put("/products/update-product/:orderId/:productId", validateJWT, returnedOrdersController.putReturnedOrderProduct);

returnedOrdersRouter.delete("/delete-order/:orderId", validateJWT, returnedOrdersController.deleteReturnedOrder);

returnedOrdersRouter.delete("/products/delete-product/:orderId/:productId", validateJWT, returnedOrdersController.deleteProductFromReturnedOrder);

module.exports = returnedOrdersRouter;