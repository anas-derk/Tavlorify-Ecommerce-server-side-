const { getResponseObject } = require("../global/functions");

const pricesManagmentFunctions = require("../models/prices.model");

async function getPricesByProductName(req, res) {
    try{
        const { productName } = req.query;
        if (
            productName !== "poster" &&
            productName !== "wooden-frame" &&
            productName !== "hanger" &&
            productName !== "canvas"
        ) {
            res.status(400).json(getResponseObject("Please Send Valid Product Name !!", true, {}));
            return;
        }
        res.json(await pricesManagmentFunctions.getPricesByProductName(productName));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getPriceByProductDetails(req, res) {
    try{
        const { productName, position, dimentions } = req.query;
        res.json(await pricesManagmentFunctions.getPriceByProductDetails(productName, position, dimentions));
    }
    catch(err) {
        console.log(err)
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putProductPrice(req, res) {
    try{
        const { newProductPriceBeforeDiscount, newProductPriceAfterDiscount } = req.body;
        res.json(await pricesManagmentFunctions.updateProductPrice(req.params.productId, newProductPriceBeforeDiscount, newProductPriceAfterDiscount));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getPricesByProductName,
    getPriceByProductDetails,
    putProductPrice,
}