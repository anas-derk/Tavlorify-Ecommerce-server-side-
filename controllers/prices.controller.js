async function getPricesByProductName(req, res) {
    try{
        const productName = req.query.productName;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
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
            await res.status(400).json("Please Send Valid Product Name !!");
            return;
        }
        const { getPricesByProductName } = require("../models/prices.model");
        const result = await getPricesByProductName(productName);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function putProductPrice(req, res) {
    try{
        const productId = req.params.productId;
        const   newProductPriceBeforeDiscount = req.body.newProductPriceBeforeDiscount,
                newProductPriceAfterDiscount = req.body.newProductPriceAfterDiscount;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
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
        const result = await updateProductPrice(productId, newProductPriceBeforeDiscount, newProductPriceAfterDiscount);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function getPriceByProductDetails(req, res) {
    try{
        const   productName = req.query.productName,
                position = req.query.position,
                dimentions = req.query.dimentions;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
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
        const result = await getPriceByProductDetails(productName, position, dimentions);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    getPricesByProductName,
    putProductPrice,
    getPriceByProductDetails,
}