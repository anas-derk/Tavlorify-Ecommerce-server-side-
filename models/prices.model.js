// Import Product Prices Model Object

const { productPricesModel } = require("../models/all.models");

async function getPricesByProductName(productName) {
    try{
        return await productPricesModel.find({ productName });
    }
    catch(err) {
        throw Error(err);
    }
}

async function getPriceByProductDetails(productName, position, dimentions) {
    try{
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
            case "poster-with-wooden-frame": {
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
        return {
            msg: "Get Prices By Product Details Process Has Been Successfully !!",
            error: false,
            data: productPrices,
        };
    }
    catch(err) {
        throw Error(err);
    }
}

async function updateProductPrice(productId, newProductPriceBeforeDiscount, newProductPriceAfterDiscount) {
    try{
        const product = await productPricesModel.findOneAndUpdate(
            { _id: productId },
            {
                priceBeforeDiscount: newProductPriceBeforeDiscount,
                priceAfterDiscount: newProductPriceAfterDiscount
            }
        );
        if (product) {
            return {
                msg: "Updating Product Price Process Has Been Successfuly !!",
                error: false,
                data: {},
            };
        }
        return {
            msg: "Sorry, This Product Is Not Found !!",
            error: true,
            data: {},
        };
    }
    catch(err) {
        throw Error(err);
    }
}

module.exports = {
    getPricesByProductName,
    getPriceByProductDetails,
    updateProductPrice,
}