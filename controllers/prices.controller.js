async function getPricesByProductName(req, res) {
    try{
        const productName = req.query.productName;
        if (!productName) await res.status(400).json("Please Send Product Name !!");
        else if (
            productName !== "poster" &&
            productName !== "wooden-frame" &&
            productName !== "hanger" &&
            productName !== "canvas"
        ) await res.status(400).json("Please Send Valid Product Name !!");
        else {
            const { getPricesByProductName } = require("../models/prices.model");
            const result = await getPricesByProductName(productName);
            await res.json(result);
        }
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
        if (!productId) await res.status(400).json("Please Send Product Id !!");
        else {
            const { updateProductPrice } = require("../models/prices.model");
            const result = await updateProductPrice(productId, newProductPriceBeforeDiscount, newProductPriceAfterDiscount);
            await res.json(result);
        }
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
        if (!productName || !dimentions || !position) await res.status(400).json("Please Send All Product Details !!");
        else {
            const { getPriceByProductDetails } = require("../models/prices.model");
            const result = await getPriceByProductDetails(productName, position, dimentions);
            await res.json(result);
        }
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