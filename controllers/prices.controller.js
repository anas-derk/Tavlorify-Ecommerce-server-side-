const { getResponseObject } = require("../global/functions");

const pricesManagmentFunctions = require("../models/prices.model");

async function getPricesByProductName(req, res) {
    try{
        const productName = req.query.productName;
        if (
            productName !== "poster" &&
            productName !== "wooden-frame" &&
            productName !== "hanger" &&
            productName !== "canvas"
        ) {
            await res.status(400).json(getResponseObject("Please Send Valid Product Name !!", true, {}));
            return;
        }
        await res.json(await pricesManagmentFunctions.getPricesByProductName(productName));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getPriceByProductDetails(req, res) {
    try{
        const productDetails = req.query;
        await res.json(await pricesManagmentFunctions.getPriceByProductDetails(productDetails.productName, productDetails.position, productDetails.dimentions));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putProductPrice(req, res) {
    try{
        const productId = req.params.productId;
        const prices = req.body;
        await res.json(await pricesManagmentFunctions.updateProductPrice(req.params.productId, prices.newProductPriceBeforeDiscount, prices.newProductPriceAfterDiscount));
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