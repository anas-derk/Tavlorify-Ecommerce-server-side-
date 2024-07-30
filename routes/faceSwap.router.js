const faceSwapRouter = require("express").Router();

const faceSwapController = require("../controllers/faceSwap.controller");

const multer = require("multer");

const { validateJWT, validateIsExistErrorInFiles } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

faceSwapRouter.get("/styles/category-styles-data",
    (req, res, next) => {
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
    validateIsExistErrorInFiles,
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    faceSwapController.addNewStyle
);

module.exports = faceSwapRouter;