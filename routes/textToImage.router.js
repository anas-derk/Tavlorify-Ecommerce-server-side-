const textToImageRouter = require("express").Router();

const textToImageController = require("../controllers/textToTomage.controller");

const multer = require("multer");

const { validateJWT } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

textToImageRouter.get("/generate-image",
    (req, res, next) => {
        const { textPrompt, prompt, category, model_name, width, height } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Text Prompt", fieldValue: textPrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Prompt", fieldValue: prompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: category, dataType: "string", isRequiredValue: false },
            { fieldName: "Model Name", fieldValue: model_name, dataType: "string", isRequiredValue: true },
            { fieldName: "Width", fieldValue: Number(width), dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: Number(height), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.generateImage
);

textToImageRouter.get("/categories/all-categories-data", textToImageController.getAllCategoriesData);

textToImageRouter.get("/styles/category-styles-data",
    (req, res, next) => {
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
    (req, res, next) => {
        const { categoryName, styleName, stylePrompt, styleNegativePrompt, modelName } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Model Name", fieldValue: modelName, dataType: "string", isRequiredValue: true },
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
    (req, res, next) => {
        const { categoryName, styleName, stylePrompt, styleNegativePrompt, modelName } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Model Name", fieldValue: modelName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.addNewStyle
);

textToImageRouter.put("/categories/update-category-data/:categoryId",
    validateJWT,
    async (req, res, next) => {
        const { newCategorySortNumber, newCategoryName } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: req.params.categoryId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "New Category Sort Number", fieldValue: Number(newCategorySortNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "New Category Name", fieldValue: newCategoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.putCategoryData
);

textToImageRouter.put("/styles/update-style-data/:styleId",
    validateJWT,
    (req, res, next) => {
        const { newCategoryStyleSortNumber, newName, newPrompt, newNegativePrompt, newModelName } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: req.params.styleId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "New Category Style Sort Number", fieldValue: Number(newCategoryStyleSortNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "New Name", fieldValue: newName, dataType: "string", isRequiredValue: false },
            { fieldName: "New Prompt", fieldValue: newPrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Negative Prompt", fieldValue: newNegativePrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Model Name", fieldValue: newModelName, dataType: "string", isRequiredValue: false },
        ], res, next);
    },
    textToImageController.putStyleData
);

textToImageRouter.delete("/categories/delete-category-data/:categoryId",
    validateJWT,
    (req, res, next) => {;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: req.params.categoryId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.deleteCategoryData
);

textToImageRouter.delete("/styles/delete-style-data/:styleId",
    validateJWT,
    (req, res, next) => {;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: req.params.styleId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    textToImageController.deleteStyleData
);

module.exports = textToImageRouter;