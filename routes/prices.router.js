const pricesRouter = require("express").Router();

const pricesController = require("../controllers/prices.controller.js");

const { validateJWT } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

pricesRouter.get(`/prices-by-product-name`,
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Name", fieldValue: req.query.productName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    pricesController.getPricesByProductName
);

pricesRouter.get(`/prices-by-product-details`,
    async (req, res, next) => {
        const productDetails = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Name", fieldValue: productDetails.productName, dataType: "string", isRequiredValue: true },
            { fieldName: "Position", fieldValue: productDetails.position, dataType: "string", isRequiredValue: true },
            { fieldName: "Dimentions", fieldValue: productDetails.dimentions, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    pricesController.getPriceByProductDetails
);

pricesRouter.put(`/update-product-price/:productId`,
    validateJWT,
    async (req, res, next) => {
        const prices = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Id", fieldValue: req.params.productId, dataType: "string", isRequiredValue: true },
            { fieldName: "New Product Price Before Discount", fieldValue: Number(prices.newProductPriceBeforeDiscount), dataType: "number", isRequiredValue: true },
            { fieldName: "New Product Price After Discount", fieldValue: Number(prices.newProductPriceAfterDiscount), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    pricesController.putProductPrice
);

module.exports = pricesRouter;