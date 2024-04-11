const textToImageRouter = require("express").Router();

const textToImageController = require("../controllers/textToTomage.controller");

const multer = require("multer");

const { validateJWT } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

textToImageRouter.get("/generate-image",
    async (req, res, next) => {
        const textToImageInfo = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Text Prompt", fieldValue: textToImageInfo.textPrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Prompt", fieldValue: textToImageInfo.prompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: textToImageInfo.category, dataType: "string", isRequiredValue: false },
            { fieldName: "Model Name", fieldValue: textToImageInfo.model_name, dataType: "string", isRequiredValue: true },
            { fieldName: "Width", fieldValue: Number(textToImageInfo.width), dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: Number(textToImageInfo.height), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.generateImage
);

textToImageRouter.get("/categories/all-categories-data", textToImageController.getAllCategoriesData);

textToImageRouter.get("/styles/category-styles-data",
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.get_all_category_styles_data
);

textToImageRouter.post("/categories/add-new-category",
    validateJWT,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                if (file.fieldname === "categoryImgFile") {
                    cb(null, "./assets/images/categories/textToImage");
                }
                else if (file.fieldname === "styleImgFile") {
                    cb(null, "./assets/images/styles/textToImage");
                }
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
    }).fields([{
        name: "categoryImgFile",
        maxCount: 1,
    }, { name: "styleImgFile", maxCount: 1 }]),
    async (req, res, next) => {
        const categoryData = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryData.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: categoryData.styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: categoryData.stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: categoryData.styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Model Name", fieldValue: categoryData.modelName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.addNewCategory
);

textToImageRouter.post("/styles/add-new-style",
    validateJWT,
    multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./assets/images/styles/textToImage");
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
    }).single("styleImgFile"),
    async (req, res, next) => {
        const styleData = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: styleData.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleData.styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: styleData.stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: styleData.styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Model Name", fieldValue: styleData.modelName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.addNewStyle
);

textToImageRouter.put("/categories/update-category-data/:categoryId",
    validateJWT,
    async (req, res, next) => {
        const categoryData = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: req.params.categoryId, dataType: "string", isRequiredValue: true },
            { fieldName: "New Category Sort Number", fieldValue: Number(categoryData.newCategorySortNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "New Category Name", fieldValue: categoryData.newCategoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.putCategoryData
);

textToImageRouter.put("/styles/update-style-data/:styleId",
    validateJWT,
    async (req, res, next) => {
        const newStyleData = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: req.params.styleId, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "New Category Style Sort Number", fieldValue: Number(newStyleData.newCategoryStyleSortNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "New Name", fieldValue: newStyleData.newName, dataType: "string", isRequiredValue: false },
            { fieldName: "New Prompt", fieldValue: newStyleData.newPrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Negative Prompt", fieldValue: newStyleData.newNegativePrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Model Name", fieldValue: newStyleData.newModelName, dataType: "string", isRequiredValue: false },
        ], res, next);
    },
    textToImageController.putStyleData
);

textToImageRouter.delete("/categories/delete-category-data/:categoryId",
    validateJWT,
    async (req, res, next) => {;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: req.params.categoryId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.deleteCategoryData
);

textToImageRouter.delete("/styles/delete-style-data/:styleId",
    validateJWT,
    async (req, res, next) => {;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: req.params.styleId, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.deleteStyleData
);

module.exports = textToImageRouter;