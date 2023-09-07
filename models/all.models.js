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
    country: String,
    registerationDate: {
        type: Date,
        default: Date.now(),
    },
});

// Create User Model From User Schema

const userModel = mongoose.model("user", userSchema);

// Create Text To Image Style Schema

const textToImageStyleSchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    prompt: String,
    negative_prompt: String,
    num_inference_steps: {
        type: Number,
        default: 50,
    },
    refine: {
        type: String,
        default: "",
    },
    modelName: String,
    categoryName: String,
    sortNumber: Number,
});

// Create Text To Image Style Model From Style Schema

const textToImageStyleModel = mongoose.model("text_to_image_style", textToImageStyleSchema);

// Create Text To Image Category Schema

const textToImageCategorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    sortNumber: Number,
});

// Create Text To Image Category Model From Category Schema

const textToImageCategoryModel = mongoose.model("text_to_image_categorie", textToImageCategorySchema);

// Create Image To Image Style Schema

const imageToImageStyleSchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    prompt: String,
    negative_prompt: String,
    ddim_steps: Number,
    strength: Number,
    modelName: {
        type: String,
        default: "controlnet-1.1-x-realistic-vision-v2.0",
    },
    categoryName: String,
    sortNumber: Number,
});

// Create Image To Image Style Model From Style Schema

const imageToImageStyleModel = mongoose.model("image_to_image_style", imageToImageStyleSchema);

// Create Image To Image Category Schema

const imageToImageCategorySchema = mongoose.Schema({
    imgSrc: String,
    name: String,
    sortNumber: Number,
});

// Create Image To Image Category Model From Category Schema

const imageToImageCategoryModel = mongoose.model("image_to_image_categorie", imageToImageCategorySchema);

// Create Product Schema

const productSchema = mongoose.Schema({
    imageSrc: String,
    name: String,
    orientation: String,
    subjects: Array,
    rooms: Array,
    styles: Array,
    colors: Array,
    price: Number,
    numberOfOrders: {
        type: Number,
        default: 0,
    },
    postOfDate: {
        type: Date,
        default: Date.now(),
    },
});

// Create Product Model From Product Schema

const productModel = mongoose.model("product", productSchema);

// Create Category Schema

const categorySchema = mongoose.Schema({
    categoryType: String,
    name: String,
    subCategories: {
        type: [{
            subCategoryName: String,
            subCategories: [{ subCategoryName: String }],
        }],
        default: [],
    },
});

// Create Category Model From Category Schema

const categoryModel = mongoose.model("categorie", categorySchema);

// Create Order Schema

const orderSchema = mongoose.Schema({
    imageSrc: String,
    name: String,
    type: String,
    dimentions: String,
    price: Number,
});

// Create Order Model From Order Schema

const orderModel = mongoose.model("order", orderSchema);

// Create generated Image Schema

const generatedImageSchema = mongoose.Schema({
    service: String,
    uploadedImageURL: {
        type: String,
        default: "",
    },
    textPrompt: {
        type: String,
        default: "",
    },
    categoryName: String,
    styleName: String,
    paintingType: String,
    position: String,
    size: String,
    isExistWhiteBorder: {
        type: String,
        default: "without-border",
    },
    width: Number,
    height: Number,
    generatedImageURL: String,
});

// Create generated Image Model From generated Image Schema

const generatedImageModel = mongoose.model("generated_image", generatedImageSchema);

module.exports = {
    mongoose,
    adminModel,
    userModel,
    textToImageStyleModel,
    textToImageCategoryModel,
    imageToImageStyleModel,
    imageToImageCategoryModel,
    productModel,
    categoryModel,
    orderModel,
    generatedImageModel,
}