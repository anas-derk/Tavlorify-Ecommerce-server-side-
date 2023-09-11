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

module.exports = {
    getPricesByProductName,
}