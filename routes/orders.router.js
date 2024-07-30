const ordersRouter = require("express").Router();

const ordersController = require("../controllers/orders.controller");

const { validateJWT } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

ordersRouter.get("/orders-count",
    (req, res, next) => {
        const filters = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: false },
        ], res, next);
    },
    ordersController.getOrdersCount
);

ordersRouter.get("/all-orders-inside-the-page",
    (req, res, next) => {
        const filters = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    ordersController.getAllOrdersInsideThePage
);

ordersRouter.get("/order-details/:orderId",
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: req.params.orderId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    ordersController.getOrderDetails
);

ordersRouter.get("/order-details-from-klarna/:orderId",
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: req.params.orderId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    ordersController.getOrderDetailsFromKlarnaInCheckoutPeriod
);

ordersRouter.post("/send-order-to-gelato", ordersController.postNewOrderToGelato);

ordersRouter.post("/send-order-to-klarna", ordersController.postNewOrderToKlarna);

ordersRouter.post("/handle-klarna-checkout-complete/:orderId",
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: req.params.orderId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    ordersController.postKlarnaCheckoutComplete
);

ordersRouter.post("/create-new-order", ordersController.postNewOrder);

ordersRouter.put("/update-klarna-order/:orderId",
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: req.params.orderId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    ordersController.putKlarnaOrder
);

ordersRouter.put("/update-order/:orderId",
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: req.params.orderId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    ordersController.putOrder
);

ordersRouter.put("/products/update-product/:orderId/:productId",
    validateJWT,
    (req, res, next) => {
        const { orderId, productId } = req.params;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: orderId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "Product Id", fieldValue: productId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    ordersController.putOrderProduct
);

ordersRouter.delete("/delete-order/:orderId",
    validateJWT,
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: req.params.orderId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    ordersController.deleteOrder
);

ordersRouter.delete("/products/delete-product/:orderId/:productId",
    validateJWT,
    (req, res, next) => {
        const { orderId, productId } = req.params;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: orderId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "Product Id", fieldValue: productId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    ordersController.deleteProductFromOrder
);

module.exports = ordersRouter;