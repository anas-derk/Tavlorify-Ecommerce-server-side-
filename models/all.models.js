// Import Mongoose

const { mongoose } = require("../server");

// Create Admin Schema

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create Admin Model From Admin Schema

const adminModel = mongoose.model("admin", adminSchema);

// Create Text To Image Style Schema

const textToImageStyleSchema = mongoose.Schema({
    imgSrc: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    negative_prompt: {
        type: String,
        required: true,
    },
    num_inference_steps: {
        type: Number,
        default: 50,
    },
    refine: {
        type: String,
        default: "",
    },
    modelName: {
        type: String,
        required: true,
        enum: [
            "dreamshaper",
            "stable-diffusion",
            "midjourney-diffusion",
            "deliberate-v2",
            "sdxl",
            "openjourney",
        ]
    },
    categoryName: {
        type: String,
        required: true,
    },
    sortNumber: Number,
});

// Create Text To Image Style Model From Style Schema

const textToImageStyleModel = mongoose.model("text_to_image_style", textToImageStyleSchema);

// Create Text To Image Category Schema

const textToImageCategorySchema = mongoose.Schema({
    imgSrc: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sortNumber: Number,
});

// Create Text To Image Category Model From Category Schema

const textToImageCategoryModel = mongoose.model("text_to_image_categorie", textToImageCategorySchema);

// Create Image To Image Style Schema

const imageToImageStyleSchema = mongoose.Schema({
    imgSrc: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    negative_prompt: {
        type: String,
        required: true,
    },
    ddim_steps: {
        type: Number,
        required: true,
    },
    strength: {
        type: Number,
        required: true,
    },
    modelName: {
        type: String,
        default: "controlnet-1.1-x-realistic-vision-v2.0",
        enum: [
            "controlnet-1.1-x-realistic-vision-v2.0"
        ],
    },
    categoryName: {
        type: String,
        required: true,
    },
    sortNumber: Number,
});

// Create Image To Image Style Model From Style Schema

const imageToImageStyleModel = mongoose.model("image_to_image_style", imageToImageStyleSchema);

// Create Image To Image Category Schema

const imageToImageCategorySchema = mongoose.Schema({
    imgSrc: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
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
        enum: [
            "checkout_incomplete",
            "AUTHORIZED",
            "CAPTURED"
        ]
    },
    status: {
        type: String,
        default: "pending",
        enum: [
            "pending",
            "shipping",
            "completing"
        ]
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
    service: {
        type: String,
        required: true,
        enum: [
            "text-to-image",
            "image-to-image",
            "face-swap"
        ],
    },
    uploadedImageURL: {
        type: String,
        default: "",
    },
    textPrompt: {
        type: String,
        default: "",
    },
    categoryName: {
        type: String,
        required: true,
    },
    styleName: {
        type: String,
        required: true,
    },
    paintingType: {
        type: String,
        required: true,
        enum: [
            "canvas",
            "poster",
            "poster-with-wooden-frame",
            "poster-with-hangers",
        ]
    },
    position: {
        type: String,
        required: true,
        enum: [
            "vertical",
            "horizontal",
            "square"
        ]
    },
    size: {
        type: String,
        required: true,
        enum: [
            "30x30",
            "50x50",
            "70x70",
            "21x29,7",
            "30x40",
            "50x70",
            "70x100",
            "21x29,7",
            "40x30",
            "70x50",
            "100x70",
        ],
    },
    isExistWhiteBorder: {
        type: String,
        default: "without-border",
        enum: [
            "without-border",
            "with-border",
        ],
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    frameColor: {
        type: String,
        default: "none",
        enum: [
            "none",
            "black",
            "white",
            "natural-wood",
            "dark-wood",
        ],
    },
    generatedImagePath: {
        type: String,
        required: true,
    },
    imageGenerationDate: {
        type: Date,
        default: Date.now(),
    },
});

// Create generated Image Model From generated Image Schema

const generatedImageModel = mongoose.model("generated_image", generatedImageSchema);

// Create Product Prices Schema

const productPricesSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    dimentions: {
        type: String,
        required: true,
        enum: [
            "30x30",
            "50x50",
            "70x70",
            "21x29,7",
            "30x40",
            "50x70",
            "70x100",
            "29,7x21",
            "40x30",
            "70x50",
            "100x70",
        ],
    },
    position: {
        type: String,
        required: true,
    },
    priceBeforeDiscount: {
        type: Number,
        required: true,
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
    },
});

// Create Product Prices Model From Product Prices Schema

const productPricesModel = mongoose.model("prices", productPricesSchema);

// Create Returned Order Schema

const returnedOrderSchema = mongoose.Schema({
    returnedOrderNumber: Number,
    orderNumber: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "awaiting products",
        enum: [
            "awaiting products",
            "received products",
            "checking products",
            "returned products"
        ],
    },
    order_amount: {
        type: Number,
        required: true,
    },
    customer: {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
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
    categoryName: {
        type: String,
        required: true,
    },
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