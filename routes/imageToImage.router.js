const imageToImageRouter = require("express").Router();

const imageToImageController = require("../controllers/imageToImage.controller");

const { validateJWT } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

const multer = require("multer");

imageToImageRouter.get("/generate-image",
    (req, res, next) => {
        const { imageLink, prompt, n_prompt, image_resolution, preprocessor_resolution, ddim_steps, strength } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Image Link", fieldValue: imageLink, dataType: "string", isRequiredValue: true },
            { fieldName: "Prompt", fieldValue: prompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Negative Prompt", fieldValue:n_prompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Image Resolution", fieldValue: Number(image_resolution), dataType: "number", isRequiredValue: false },
            { fieldName: "Preprocessor Resolution", fieldValue: Number(preprocessor_resolution), dataType: "number", isRequiredValue: true },
            { fieldName: "Ddim Steps", fieldValue: Number(ddim_steps), dataType: "number", isRequiredValue: true },
            { fieldName: "Strength", fieldValue: Number(strength), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    imageToImageController.generateImage
);

imageToImageRouter.get("/categories/all-categories-data", imageToImageController.getAllCategoriesData);

imageToImageRouter.get("/styles/category-styles-data",
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    imageToImageController.get_all_category_Styles_Data
);

imageToImageRouter.post("/upload-image-and-processing",
    multer({
        storage: multer.memoryStorage(),
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
    }).single("imageFile"),
    imageToImageController.uploadImageAndProcessing
);

imageToImageRouter.post("/categories/add-new-category",
    validateJWT,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                if (file.fieldname === "categoryImgFile") {
                    cb(null, "./assets/images/categories/imageToImage");
                }
                else if (file.fieldname === "styleImgFile") {
                    cb(null, "./assets/images/styles/imageToImage");
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
        const { categoryName, styleName, stylePrompt, styleNegativePrompt, ddim_steps, strength } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Ddim Steps", fieldValue: Number(ddim_steps), dataType: "number", isRequiredValue: true },
            { fieldName: "Strength", fieldValue: Number(strength), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    imageToImageController.addNewCategory
);

imageToImageRouter.post("/styles/add-new-style",
    validateJWT,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "./assets/images/styles/imageToImage");
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
        const { categoryName, styleName, stylePrompt, styleNegativePrompt, ddim_steps, strength } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Ddim Steps", fieldValue: Number(ddim_steps), dataType: "number", isRequiredValue: true },
            { fieldName: "Strength", fieldValue: Number(strength), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    imageToImageController.addNewStyle
);

imageToImageRouter.put("/categories/update-category-data/:categoryId",
    validateJWT,
    (req, res, next) => {
        const { newCategorySortNumber, newCategoryName } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: req.params.categoryId, dataType: "string", isRequiredValue: true },
            { fieldName: "New Category Sort Number", fieldValue: Number(newCategorySortNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "New Category Name", fieldValue: newCategoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    imageToImageController.putCategoryData
);

imageToImageRouter.put("/styles/update-style-data/:styleId",
    validateJWT,
    (req, res, next) => {
        const { newCategoryStyleSortNumber, newName, newPrompt, newNegativePrompt, newDdimSteps, newStrength } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: req.params.styleId, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "New Category Style Sort Number", fieldValue: Number(newCategoryStyleSortNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "New Name", fieldValue: newName, dataType: "string", isRequiredValue: false },
            { fieldName: "New Prompt", fieldValue: newPrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Negative Prompt", fieldValue: newNegativePrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Ddim Steps", fieldValue: Number(newDdimSteps), dataType: "number", isRequiredValue: false },
            { fieldName: "New Strength", fieldValue: Number(newStrength), dataType: "number", isRequiredValue: false },
        ], res, next);
    },
    imageToImageController.putStyleData
);

imageToImageRouter.delete("/categories/delete-category-data/:categoryId",
    validateJWT,
    (req, res, next) => {;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: req.params.categoryId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    imageToImageController.deleteCategoryData,
);

imageToImageRouter.delete("/styles/delete-style-data/:styleId",
    validateJWT,
    (req, res, next) => {;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: req.params.styleId, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    imageToImageController.deleteStyleData
);

module.exports = imageToImageRouter;