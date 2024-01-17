// Import Mongoose And Product Prices Model Object

const { mongoose, productPricesModel } = require("../models/all.models");

// Import Database URL

const DB_URL = "mongodb://127.0.0.1:27017/tavlorify-store";

const productPricesData = [
    {
        productName: "poster",
        dimentions: "21x29,7",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "30x40",
        position: "vertical",
        priceBeforeDiscount: 449,
        priceAfterDiscount: 449,
    },
    {
        productName: "poster",
        dimentions: "50x70",
        position: "vertical",
        priceBeforeDiscount: 699,
        priceAfterDiscount: 699,
    },
    {
        productName: "poster",
        dimentions: "70x100",
        position: "vertical",
        priceBeforeDiscount: 799,
        priceAfterDiscount: 799,
    },
    {
        productName: "poster",
        dimentions: "29,7x21",
        position: "horizontal",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "poster",
        dimentions: "40x30",
        position: "horizontal",
        priceBeforeDiscount: 449,
        priceAfterDiscount: 449,
    },
    {
        productName: "poster",
        dimentions: "70x50",
        position: "horizontal",
        priceBeforeDiscount: 699,
        priceAfterDiscount: 699,
    },
    {
        productName: "poster",
        dimentions: "100x70",
        position: "horizontal",
        priceBeforeDiscount: 799,
        priceAfterDiscount: 799,
    },
    {
        productName: "poster",
        dimentions: "30x30",
        position: "square",
        priceBeforeDiscount: 429,
        priceAfterDiscount: 429,
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
        priceBeforeDiscount: 599,
        priceAfterDiscount: 599,
    },
    {
        productName: "wooden-frame",
        dimentions: "21x29,7",
        position: "vertical",
        priceBeforeDiscount: 749,
        priceAfterDiscount: 749,
    },
    {
        productName: "wooden-frame",
        dimentions: "30x40",
        position: "vertical",
        priceBeforeDiscount: 199,
        priceAfterDiscount: 199,
    },
    {
        productName: "wooden-frame",
        dimentions: "50x70",
        position: "vertical",
        priceBeforeDiscount: 499,
        priceAfterDiscount: 499,
    },
    {
        productName: "wooden-frame",
        dimentions: "70x100",
        position: "vertical",
        priceBeforeDiscount: 649,
        priceAfterDiscount: 649,
    },
    {
        productName: "wooden-frame",
        dimentions: "29,7x21",
        position: "horizontal",
        priceBeforeDiscount: 199,
        priceAfterDiscount: 199,
    },
    {
        productName: "wooden-frame",
        dimentions: "40x30",
        position: "horizontal",
        priceBeforeDiscount: 299,
        priceAfterDiscount: 299,
    },
    {
        productName: "wooden-frame",
        dimentions: "70x50",
        position: "horizontal",
        priceBeforeDiscount: 499,
        priceAfterDiscount: 499,
    },
    {
        productName: "wooden-frame",
        dimentions: "100x70",
        position: "horizontal",
        priceBeforeDiscount: 649,
        priceAfterDiscount: 649,
    },
    {
        productName: "wooden-frame",
        dimentions: "30x30",
        position: "square",
        priceBeforeDiscount: 249,
        priceAfterDiscount: 249,
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
        priceBeforeDiscount: 599,
        priceAfterDiscount: 599,
    },
    {
        productName: "hanger",
        dimentions: "21x29,7",
        position: "vertical",
        priceBeforeDiscount: 199,
        priceAfterDiscount: 199,
    },
    {
        productName: "hanger",
        dimentions: "30x40",
        position: "vertical",
        priceBeforeDiscount: 229,
        priceAfterDiscount: 229,
    },
    {
        productName: "hanger",
        dimentions: "50x70",
        position: "vertical",
        priceBeforeDiscount: 299,
        priceAfterDiscount: 299,
    },
    {
        productName: "hanger",
        dimentions: "70x100",
        position: "vertical",
        priceBeforeDiscount: 399,
        priceAfterDiscount: 399,
    },
    {
        productName: "hanger",
        dimentions: "29,7x21",
        position: "horizontal",
        priceBeforeDiscount: 179,
        priceAfterDiscount: 179,
    },
    {
        productName: "hanger",
        dimentions: "40x30",
        position: "horizontal",
        priceBeforeDiscount: 199,
        priceAfterDiscount: 199,
    },
    {
        productName: "hanger",
        dimentions: "70x50",
        position: "horizontal",
        priceBeforeDiscount: 249,
        priceAfterDiscount: 249,
    },
    {
        productName: "hanger",
        dimentions: "100x70",
        position: "horizontal",
        priceBeforeDiscount: 299,
        priceAfterDiscount: 299,
    },
    {
        productName: "hanger",
        dimentions: "30x30",
        position: "square",
        priceBeforeDiscount: 199,
        priceAfterDiscount: 199,
    },
    {
        productName: "hanger",
        dimentions: "50x50",
        position: "square",
        priceBeforeDiscount: 249,
        priceAfterDiscount: 249,
    },
    {
        productName: "hanger",
        dimentions: "70x70",
        position: "square",
        priceBeforeDiscount: 299,
        priceAfterDiscount: 299,
    },
    {
        productName: "canvas",
        dimentions: "30x40",
        position: "vertical",
        priceBeforeDiscount: 599,
        priceAfterDiscount: 599,
    },
    {
        productName: "canvas",
        dimentions: "50x70",
        position: "vertical",
        priceBeforeDiscount: 949,
        priceAfterDiscount: 949,
    },
    {
        productName: "canvas",
        dimentions: "70x100",
        position: "vertical",
        priceBeforeDiscount: 1499,
        priceAfterDiscount: 1499,
    },
    {
        productName: "canvas",
        dimentions: "40x30",
        position: "horizontal",
        priceBeforeDiscount: 599,
        priceAfterDiscount: 599,
    },
    {
        productName: "canvas",
        dimentions: "70x50",
        position: "horizontal",
        priceBeforeDiscount: 949,
        priceAfterDiscount: 949,
    },
    {
        productName: "canvas",
        dimentions: "100x70",
        position: "horizontal",
        priceBeforeDiscount: 1499,
        priceAfterDiscount: 1499,
    },
    {
        productName: "canvas",
        dimentions: "30x30",
        position: "square",
        priceBeforeDiscount: 499,
        priceAfterDiscount: 499,
    },
    {
        productName: "canvas",
        dimentions: "50x50",
        position: "square",
        priceBeforeDiscount: 799,
        priceAfterDiscount: 799,
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