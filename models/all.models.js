// Import Mongoose

const mongoose = require("mongoose");

// Create User Schema

const adminSchema = mongoose.Schema({
    email: String,
    password: String,
});

// Create User Model From User Schema

const adminModel = mongoose.model("admin", adminSchema);

// Create User Schema

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
});

// Create User Model From User Schema

const userModel = mongoose.model("user", userSchema);

// Create Text To Image Style Schema

const textToImageStyleSchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    prompt: String,
    negative_prompt: String,
    modelName: String,
    categoryName: String,
});

// Create Text To Image Style Model From Style Schema

const textToImageStyleModel = mongoose.model("text-to-image-style", textToImageStyleSchema);

// Create Text To Image Category Schema

const textToImageCategorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
});

// Create Text To Image Category Model From Category Schema

const textToImageCategoryModel = mongoose.model("text-to-image-categorie", textToImageCategorySchema);

// Create Image To Image Style Schema

const imageToImageStyleSchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    prompt: String,
    negative_prompt: String,
    ddim_steps: Number,
    strength: Number,
    modelName: String,
    categoryName: String,
});

// Create Image To Image Style Model From Style Schema

const imageToImageStyleModel = mongoose.model("image-to-image-style", imageToImageStyleSchema);

// Create Image To Image Category Schema

const imageToImageCategorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
});

// Create Image To Image Category Model From Category Schema

const imageToImageCategoryModel = mongoose.model("image-to-image-categorie", imageToImageCategorySchema);

// Create Product Schema

const productSchema = mongoose.Schema({
    imageSrc: String,
    name: String,
    type: String,
    dimentions: String,
    price: Number,
});

// Create Product Model From Product Schema

const productModel = mongoose.model("product", productSchema);

module.exports = {
    mongoose,
    adminModel,
    userModel,
    textToImageStyleModel,
    textToImageCategoryModel,
    imageToImageStyleModel,
    imageToImageCategoryModel,
    productModel,
}