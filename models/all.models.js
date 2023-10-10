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
    klarnaOrderId: {
        type: String,
        default: "none",
    },
    klarnaReference: {
        type: String,
        default: "none",
    },
    order_amount: {
        type: Number,
        default: 0,
    },
    checkout_status: {
        type: String,
        default: "checkout_incomplete",
    },
    status: {
        type: String,
        default: "pending",
    },
    billing_address: {
        city: {
            type: String,
            default: "none",
        },
        email: {
            type: String,
            default: "none",
        },
        given_name: {
            type: String,
            default: "none",
        },
        family_name: {
            type: String,
            default: "none",
        },
        phone: {
            type: String,
            default: "none",
        },
        postal_code: {
            type: String,
            default: "none",
        },
        street_address: {
            type: String,
            default: "none",
        },
    },
    shipping_address: {
        city: {
            type: String,
            default: "none",
        },
        email: {
            type: String,
            default: "none",
        },
        given_name: {
            type: String,
            default: "none",
        },
        family_name: {
            type: String,
            default: "none",
        },
        phone: {
            type: String,
            default: "none",
        },
        postal_code: {
            type: String,
            default: "none",
        },
        street_address: {
            type: String,
            default: "none",
        },
    },
    order_lines: [{
        reference: {
            type: String,
            default: "none",
        },
        quantity: {
            type: Number,
            default: 0,
        },
        name: {
            type: String,
            default: "none",
        },
        total_amount: {
            type: Number,
            default: 0,
        },
        unit_price: {
            type: Number,
            default: 0,
        },
        image_url: {
            type: String,
            default: "none",
        },
    }],
    added_date: {
        type: Date,
        default: Date.now(),
    },
    orderNumber: Number,
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
    frameColor: {
        type: String,
        default: "none",
    },
    generatedImageURL: String,
    imageGegenerationDate: {
        type: Date,
        default: Date.now(),
    },
});

// Create generated Image Model From generated Image Schema

const generatedImageModel = mongoose.model("generated_image", generatedImageSchema);

// Create Product Prices Schema

const productPricesSchema = mongoose.Schema({
    productName: String,
    dimentions: String,
    position: String,
    priceBeforeDiscount: Number,
    priceAfterDiscount: Number,
});

// Create Product Prices Model From Product Prices Schema

const productPricesModel = mongoose.model("prices", productPricesSchema);

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
    productPricesModel,
}