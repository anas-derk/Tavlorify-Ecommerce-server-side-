const { getResponseObject, checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");

async function getPricesByProductName(req, res) {
    try{
        const productName = req.query.productName;
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Name", fieldValue: productName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        if (
            productName !== "poster" &&
            productName !== "wooden-frame" &&
            productName !== "hanger" &&
            productName !== "canvas"
        ) {
            await res.status(400).json(getResponseObject("Please Send Valid Product Name !!", true, {}));
            return;
        }
        const { getPricesByProductName } = require("../models/prices.model");
        await res.json(await getPricesByProductName(productName));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getPriceByProductDetails(req, res) {
    try{
        const   productName = req.query.productName,
                position = req.query.position,
                dimentions = req.query.dimentions;
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Name", fieldValue: productName, dataType: "string", isRequiredValue: true },
            { fieldName: "Position", fieldValue: position, dataType: "string", isRequiredValue: true },
            { fieldName: "Dimentions", fieldValue: dimentions, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { getPriceByProductDetails } = require("../models/prices.model");
        await res.json(await getPriceByProductDetails(productName, position, dimentions));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putProductPrice(req, res) {
    try{
        const productId = req.params.productId;
        const   newProductPriceBeforeDiscount = req.body.newProductPriceBeforeDiscount,
                newProductPriceAfterDiscount = req.body.newProductPriceAfterDiscount;
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Product Id", fieldValue: productId, dataType: "string", isRequiredValue: true },
            { fieldName: "New Product Price Before Discount", fieldValue: Number(newProductPriceBeforeDiscount), dataType: "number", isRequiredValue: true },
            { fieldName: "New Product Price After Discount", fieldValue: Number(newProductPriceAfterDiscount), dataType: "number", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { updateProductPrice } = require("../models/prices.model");
        await res.json(await updateProductPrice(productId, newProductPriceBeforeDiscount, newProductPriceAfterDiscount));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getPricesByProductName,
    getPriceByProductDetails,
    putProductPrice,
}