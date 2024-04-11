const returnedOrdersRouter = require("express").Router();

const returnedOrdersController = require("../controllers/returnedOrders.controller");

const { validateJWT } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

returnedOrdersRouter.get("/orders-count",
    async (req, res, next) => {
        const filters = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: false },
        ], res, next);
    },
    returnedOrdersController.getReturnedOrdersCount
);

returnedOrdersRouter.get("/all-orders-inside-the-page",
    async (req, res, next) => {
        const filters = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    returnedOrdersController.getAllReturnedOrdersInsideThePage
);

returnedOrdersRouter.get("/order-details/:orderId",
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: req.params.orderId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    returnedOrdersController.getReturnedOrderDetails
);

returnedOrdersRouter.post("/create-new-order/:orderId",
    validateJWT,
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: req.params.orderId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    returnedOrdersController.postNewReturnedOrder
);

returnedOrdersRouter.put("/update-order/:orderId",
    validateJWT,
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: req.params.orderId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    returnedOrdersController.putReturnedOrder
);

returnedOrdersRouter.put("/products/update-product/:orderId/:productId",
    validateJWT,
    async (req, res, next) => {
        const returnedOrderAndProductIds = req.params;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: returnedOrderAndProductIds.orderId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "Returned Product Id", fieldValue: returnedOrderAndProductIds.productId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    returnedOrdersController.putReturnedOrderProduct
);

returnedOrdersRouter.delete("/delete-order/:orderId",
    validateJWT,
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: req.params.orderId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    returnedOrdersController.deleteReturnedOrder
);

returnedOrdersRouter.delete("/products/delete-product/:orderId/:productId",
    validateJWT,
    async (req, res, next) => {
        const returnedOrderAndProductIds = req.params;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: returnedOrderAndProductIds.orderId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "Returned Product Id", fieldValue: returnedOrderAndProductIds.productId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    returnedOrdersController.deleteProductFromReturnedOrder
);

module.exports = returnedOrdersRouter;