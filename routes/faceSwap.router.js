const faceSwapRouter = require("express").Router();

const faceSwapController = require("../controllers/faceSwap.controller");

const multer = require("multer");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

const { validateJWT } = require("../middlewares/global.middlewares");

faceSwapRouter.get("/generate-image",
    async (req, res, next) => {
        const faceSwapInfo = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Image Link", fieldValue: faceSwapInfo.imageLink, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Image Link", fieldValue: faceSwapInfo.styleImageLink, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    faceSwapController.generateImage
);

faceSwapRouter.get("/styles/category-styles-data",
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    faceSwapController.getAllCategoryStylesData
);

faceSwapRouter.post("/styles/add-new-style",
    validateJWT,
    multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./assets/images/styles/faceSwap");
        },
        filename: (req, file, cb) => {
            cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!file) {
            req.uploadError = "Sorry, No File Uploaded, Please Upload The File";
            return cb(null, false);
        }
        if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/png" &&
            file.mimetype !== "image/webp"
        ){
            req.uploadError = "Sorry, Invalid File Mimetype, Only JPEG and PNG Or WEBP files are allowed !!";
            return cb(null, false);
        }
        cb(null, true);
    }
    }).fields([
        {
            name: "verticalStyleImage",
            maxCount: 1
        },
        {
            name: "horizontalStyleImage",
            maxCount: 1
        },
        {
            name: "squareStyleImage",
            maxCount: 1
        },
    ]),
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    faceSwapController.addNewStyle
);

module.exports = faceSwapRouter;