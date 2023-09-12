// Import Mongoose And Product Prices Model Object

const { mongoose, productPricesModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function getPricesByProductName(productName) {
    try{
        await mongoose.connect(DB_URL);
        const pricesListByProductName = await productPricesModel.find({ productName });
        await mongoose.disconnect();
        return pricesListByProductName;
    }
    catch(err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function getPriceByProductDetails(productName, position, dimentions) {
    try{
        await mongoose.connect(DB_URL);
        let productPrices;
        switch(productName) {
            case "poster": {
                let productData = await productPricesModel.findOne({ productName, position, dimentions });
                productPrices = { priceBeforeDiscount: productData.priceBeforeDiscount, priceAfterDiscount: productData.priceAfterDiscount };
                break;
            }
            case "canvas": {
                productData = await productPricesModel.findOne({ productName, position, dimentions });
                productPrices = { priceBeforeDiscount: productData.priceBeforeDiscount, priceAfterDiscount: productData.priceAfterDiscount };
                break;
            }
            case "poster-with-wooden-frames": {
                let productsData = await productPricesModel.find({
                    $or: [
                        {
                            productName: "poster",
                            dimentions,
                            position,
                        },
                        {
                            productName: "wooden-frame",
                            dimentions,
                            position,
                        }
                    ]
                });
                productPrices = {
                    priceBeforeDiscount: productsData[0].priceBeforeDiscount + productsData[1].priceBeforeDiscount,
                    priceAfterDiscount: productsData[0].priceAfterDiscount + productsData[1].priceAfterDiscount,
                };
                break;
            }
            case "poster-with-hangers": {
                let productsData = await productPricesModel.find({
                    $or: [
                        {
                            productName: "poster",
                            dimentions,
                            position,
                        },
                        {
                            productName: "hanger",
                            dimentions,
                            position,
                        }
                    ]
                });
                productPrices = {
                    priceBeforeDiscount: productsData[0].priceBeforeDiscount + productsData[1].priceBeforeDiscount,
                    priceAfterDiscount: productsData[0].priceAfterDiscount + productsData[1].priceAfterDiscount,
                };
                break;
            }
            default: {
                console.log("Invalid Product Name !!");
            }
        }
        await mongoose.disconnect();
        return productPrices;
    }
    catch(err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function updateProductPrice(productId, newProductPriceBeforeDiscount, newProductPriceAfterDiscount) {
    try{
        await mongoose.connect(DB_URL);
        await productPricesModel.updateOne(
            { _id: productId },
            {
                priceBeforeDiscount: newProductPriceBeforeDiscount,
                priceAfterDiscount: newProductPriceAfterDiscount
            }
        );
        await mongoose.disconnect();
        return "Updating Product Price Process Has Been Successfuly !!";
    }
    catch(err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    getPricesByProductName,
    getPriceByProductDetails,
    updateProductPrice,
}