const stylesRouter = require("express").Router();

const stylesController = require("../controllers/styles.controller");

const multer = require("multer");

const { validateJWT, validateServiceName } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

stylesRouter.get("/all-styles-data",
    (req, res, next) => {
        const { service, categoryName } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateServiceName(req.query.service, res, next),
    stylesController.getAllCategoryStylesData
);

stylesRouter.post("/add-new-style",
    validateJWT,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `./assets/images/styles/${ req.body.service === "text-to-image" ? "textToImage" : "imageToImage" }`);
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
        const { service, categoryName, styleName, stylePrompt, styleNegativePrompt, modelName } = Object.assign({}, req.body);
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Prompt", fieldValue: stylePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Negative Prompt", fieldValue: styleNegativePrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Model Name", fieldValue: modelName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateServiceName((Object.assign({}, req.body)).service, res, next),
    (req, res, next) => {
        const { service } = Object.assign({}, req.body);
        if (service === "image-to-image") {
            validateIsExistValueForFieldsAndDataTypes([
                { fieldName: "Ddim Steps", fieldValue: Number(ddim_steps), dataType: "number", isRequiredValue: true },
                { fieldName: "Strength", fieldValue: Number(strength), dataType: "number", isRequiredValue: true },
            ], res, next);
            return;
        }
        next();
    },
    stylesController.addNewStyle
);

stylesRouter.put("/update-style-data/:styleId",
    validateJWT,
    (req, res, next) => {
        const { newCategoryStyleSortNumber, newName, newPrompt, newNegativePrompt, newModelName } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Id", fieldValue: req.params.styleId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "New Category Style Sort Number", fieldValue: Number(newCategoryStyleSortNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "New Name", fieldValue: newName, dataType: "string", isRequiredValue: false },
            { fieldName: "New Prompt", fieldValue: newPrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Negative Prompt", fieldValue: newNegativePrompt, dataType: "string", isRequiredValue: false },
            { fieldName: "New Model Name", fieldValue: newModelName, dataType: "string", isRequiredValue: false },
        ], res, next);
    },
    (req, res, next) => validateServiceName(req.body.service, res, next),
    (req, res, next) => {
        const { service } = req.body;
        if (service === "image-to-image") {
            validateIsExistValueForFieldsAndDataTypes([
                { fieldName: "Ddim Steps", fieldValue: Number(ddim_steps), dataType: "number", isRequiredValue: true },
                { fieldName: "Strength", fieldValue: Number(strength), dataType: "number", isRequiredValue: true },
            ], res, next);
            return;
        }
        next();
    },
    stylesController.putStyleData
);

stylesRouter.delete("/delete-style-data/:styleId",
    validateJWT,
    (req, res, next) => {;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: req.params.styleId, dataType: "ObjectId", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: req.query.categoryName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    stylesController.deleteStyleData
);

module.exports = stylesRouter;