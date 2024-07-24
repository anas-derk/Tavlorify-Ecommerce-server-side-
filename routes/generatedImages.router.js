const generatedImagesRouter = require("express").Router();

const generatedImagesController = require("../controllers/generatedImages.controller");

const { validateJWT, validateServiceName } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

generatedImagesRouter.get("/all-generated-images-inside-the-page",
    (req, res, next) => {
        const { service, pageNumber, pageSize } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
            { fieldName: "Page Number", fieldValue: Number(pageNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "Page Size", fieldValue: Number(pageSize), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateServiceName(req.query.service, res, next),
    generatedImagesController.getAllGeneratedImagesDataInsideThePage
);

generatedImagesRouter.get("/generated-images-count",
    (req, res, next) => {
        const { service, pageNumber, pageSize } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
            { fieldName: "Page Number", fieldValue: Number(pageNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "Page Size", fieldValue: Number(pageSize), dataType: "number", isRequiredValue: false },
        ], res, next);
    },
    (req, res, next) => validateServiceName(req.query.service, res, next),
    generatedImagesController.getGeneratedImagesDataCount
);

generatedImagesRouter.post("/save-new-generated-image-data",
    (req, res, next) => {
        const { service, uploadedImageURL, textPrompt, categoryName, styleName, paintingType, position, size, isExistWhiteBorder, width, height, frameColor } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
            { fieldName: "Upload Image URL", fieldValue: uploadedImageURL, dataType: "string", isRequiredValue: service === "image-to-image" },
            { fieldName: "Text Prompt", fieldValue: textPrompt, dataType: "string", isRequiredValue: service === "text-to-image" },
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Painting Type", fieldValue: paintingType, dataType: "string", isRequiredValue: true },
            { fieldName: "Position", fieldValue: position, dataType: "string", isRequiredValue: true },
            { fieldName: "Size", fieldValue: size, dataType: "string", isRequiredValue: true },
            { fieldName: "Is Exist White Border", fieldValue: isExistWhiteBorder, dataType: "string", isRequiredValue: false },
            { fieldName: "Width", fieldValue: Number(width), dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: Number(height), dataType: "number", isRequiredValue: true },
            { fieldName: "Frame Color", fieldValue: frameColor, dataType: "string", isRequiredValue: false },
        ], res, next);
    },
    (req, res, next) => validateServiceName(req.query.service, res, next),
    generatedImagesController.postNewGeneratedImageData
);

generatedImagesRouter.post("/crop-image",
    (req, res, next) => {
        const { width, height, top, left } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Width", fieldValue: Number(width), dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: Number(height), dataType: "number", isRequiredValue: true },
            { fieldName: "Top", fieldValue: Number(top), dataType: "number", isRequiredValue: true },
            { fieldName: "Left", fieldValue: Number(left), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    generatedImagesController.postImageAfterCroping
);

generatedImagesRouter.delete("/generated-image-data/:generatedImageDataId",
    validateJWT,
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Generated Image Data Id", fieldValue: req.params.generatedImageDataId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    generatedImagesController.deleteGeneratedImageData
);

module.exports = generatedImagesRouter;