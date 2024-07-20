const pricesRouter = require("express").Router();

const pricesController = require("../controllers/prices.controller.js");

const { validateJWT } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

pricesRouter.get(`/prices-by-product-name`,
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Name", fieldValue: req.query.productName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    pricesController.getPricesByProductName
);

pricesRouter.get(`/prices-by-product-details`,
    (req, res, next) => {
        const { productName, position, dimentions } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Name", fieldValue: productName, dataType: "string", isRequiredValue: true },
            { fieldName: "Position", fieldValue: position, dataType: "string", isRequiredValue: true },
            { fieldName: "Dimentions", fieldValue: dimentions, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    pricesController.getPriceByProductDetails
);

pricesRouter.put(`/update-product-price/:productId`,
    validateJWT,
    (req, res, next) => {
        const { newProductPriceBeforeDiscount, newProductPriceAfterDiscount } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Id", fieldValue: req.params.productId, dataType: "string", isRequiredValue: true },
            { fieldName: "New Product Price Before Discount", fieldValue: Number(newProductPriceBeforeDiscount), dataType: "number", isRequiredValue: true },
            { fieldName: "New Product Price After Discount", fieldValue: Number(newProductPriceAfterDiscount), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    pricesController.putProductPrice
);

module.exports = pricesRouter;