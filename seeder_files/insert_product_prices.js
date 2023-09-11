// Import Mongoose And Product Prices Model Object

const { mongoose, productPricesModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

const productPricesData = [
    {
        productName: "poster",
        dimentions: "21x29,7",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "30x40",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "50x70",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "70x100",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "29,7x21",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "40x30",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "70x50",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "100x70",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "30x30",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "50x50",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "70x70",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "21x29,7",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "30x40",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "50x70",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "70x100",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "29,7x21",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "40x30",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "70x50",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "100x70",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "30x30",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "50x50",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "wooden-frame",
        dimentions: "70x70",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "21x29,7",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "30x40",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "50x70",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "70x100",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "29,7x21",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "40x30",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "70x50",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "100x70",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "30x30",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "50x50",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "70x70",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "canvas",
        dimentions: "30x40",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "canvas",
        dimentions: "50x70",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "canvas",
        dimentions: "70x100",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "canvas",
        dimentions: "40x30",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "canvas",
        dimentions: "70x50",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "canvas",
        dimentions: "100x70",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "canvas",
        dimentions: "30x30",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "canvas",
        dimentions: "50x50",
        position: "square",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
];

async function insert_product_prices() {
    try {
        await mongoose.connect(DB_URL);
        await productPricesModel.insertMany(productPricesData);
        await mongoose.disconnect();
        return "Ok !!, Insert Product Prices Process Is Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

insert_product_prices().then((result) => console.log(result)).catch((err) => console.log(err));