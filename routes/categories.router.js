const categoriesRouter = require("express").Router();

const categoriesController = require("../controllers/categories.controller");

const multer = require("multer");

const { validateJWT, validateServiceName } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

categoriesRouter.get("/all-categories-data",
    (req, res, next) => validateServiceName(req.query.service, res, next),
    categoriesController.getAllCategoriesData
);

categoriesRouter.post("/add-new-category",
    validateJWT,
    (req, res, next) => {
        const { service, categoryName, styleName, stylePrompt, styleNegativePrompt, modelName } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Model Name", fieldValue: modelName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateServiceName(req.body.service, res, next),
    (req, res, next) => {
        const { service } = req.body;
        if (service === "image-to-image") {
            validateIsExistValueForFieldsAndDataTypes([
                { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
                { fieldName: "Ddim Steps", fieldValue: Number(ddim_steps), dataType: "number", isRequiredValue: true },
            ], res, next);
            return;
        }
        next();
    },
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
    categoriesController.addNewCategory
);

categoriesRouter.put("/update-category-data/:categoryId",
    validateJWT,
    async (req, res, next) => {
        const { newCategorySortNumber, newCategoryName } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: req.params.categoryId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "New Category Sort Number", fieldValue: Number(newCategorySortNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "New Category Name", fieldValue: newCategoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    categoriesController.putCategoryData
);

categoriesRouter.delete("/delete-category-data/:categoryId",
    validateJWT,
    (req, res, next) => {;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Id", fieldValue: req.params.categoryId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    categoriesController.deleteCategoryData
);