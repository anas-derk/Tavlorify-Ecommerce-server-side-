// Import Mongoose

const { mongoose } = require("../server");

// Create Admin Schema

const adminSchema = mongoose.Schema({
    email: String,
    password: String,
});

// Create Admin Model From Admin Schema

const adminModel = mongoose.model("admin", adminSchema);

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
    isReturned: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
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
    generatedImagePath: String,
    imageGenerationDate: {
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

// Create Returned Order Schema

const returnedOrderSchema = mongoose.Schema({
    returnedOrderNumber: Number,
    orderNumber: Number,
    orderId: String,
    status: {
        type: String,
        default: "awaiting products",
    },
    order_amount: Number,
    customer: {
        first_name: String,
        last_name: String,
        email: String,
        phone: String,
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
        unit_price: {
            type: Number,
            default: 0,
        },
        total_amount: {
            type: Number,
            default: 0,
        },
        return_reason: String,
    }],
    added_date: {
        type: Date,
        default: Date.now(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

// Create Returned Order Model From Returned Order Schema

const returnedOrderModel = mongoose.model("returned_order", returnedOrderSchema);

// Create Face Swap Style Schema

const faceSwapStyleSchema = mongoose.Schema({
    categoryName: String,
    imgSrcList: Array,
    sortNumber: Number,
});

// Create Face Swap Style Model From Face Swap Style Schema

const faceSwapStyleModel = mongoose.model("face_swap_style", faceSwapStyleSchema);

module.exports = {
    adminModel,
    textToImageStyleModel,
    textToImageCategoryModel,
    imageToImageStyleModel,
    imageToImageCategoryModel,
    orderModel,
    generatedImageModel,
    productPricesModel,
    returnedOrderModel,
    faceSwapStyleModel,
}