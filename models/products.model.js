// Import Mongoose And Product Model Object

const { mongoose, productModel } = require("../models/all.models");

async function addNewProduct(productInfo) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        let newProductInfo = new productModel(productInfo);
        await newProductInfo.save();
        await mongoose.disconnect();
        return "Adding New Product Process It Successfuly ...";
    }
    catch (err) {
        // Disconnect To DB
        await mongoose.disconnect();
        throw Error("Sorry, Something Went Wrong !!");
    }
}

async function getProductInfo(productId) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        let productInfo = await productModel.findById(productId);
        if (productInfo) {
            await mongoose.disconnect();
            return productInfo;
        }
        else {
            await mongoose.disconnect();
            return "Sorry, This Product It Not Exist !!!";
        }
    }
    catch (err) {
        // Disconnect To DB
        await mongoose.disconnect();
        throw Error("Sorry, Something Went Wrong !!");
    }
}

async function getAllProducts() {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        let allProducts = await productModel.find({});
        await mongoose.disconnect();
        return allProducts;
    }
    catch (err) {
        // Disconnect To DB
        await mongoose.disconnect();
        throw Error("Sorry, Something Went Wrong !!");
    }
}

async function deleteProduct(productId) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        let productInfo = await productModel.findById(productId);
        await productModel.deleteOne({
            _id: productId,
        });
        await mongoose.disconnect();
        return productInfo.imageSrc;
    }
    catch (err) {
        // Disconnect To DB
        await mongoose.disconnect();
        throw Error("Sorry, Something Went Wrong !!");
    }
}

async function updateProduct(productId, newData) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        await productModel.updateOne({_id: productId}, {
            name: newData.name,
            price: newData.price,
        });
        await mongoose.disconnect();
    }
    catch (err) {
        // Disconnect To DB
        await mongoose.disconnect();
        throw Error("Sorry, Something Went Wrong !!");
    }
}

module.exports = {
    addNewProduct,
    getProductInfo,
    deleteProduct,
    getAllProducts,
    updateProduct,
}