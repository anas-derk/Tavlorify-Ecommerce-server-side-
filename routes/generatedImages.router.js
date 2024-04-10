const generatedImagesRouter = require("express").Router();

const generatedImagesController = require("../controllers/generatedImages.controller");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

const { validateJWT } = require("../middlewares/global.middlewares");

generatedImagesRouter.get("/all-generated-images-inside-the-page",
    async (req, res, next) => {
        const filters = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: filters.service, dataType: "string", isRequiredValue: true },
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: false },
        ], res, next);
    },
    generatedImagesController.getAllGeneratedImagesDataInsideThePage
);

generatedImagesRouter.get("/generated-images-count",
    async (req, res, next) => {
        const filters = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: filters.service, dataType: "string", isRequiredValue: true },
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: false },
        ], res, next);
    },
    generatedImagesController.getGeneratedImagesDataCount
);

generatedImagesRouter.post("/save-new-generated-image-data",
    async (req, res, next) => {
        const generatedImageData = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: generatedImageData.service, dataType: "string", isRequiredValue: true },
            { fieldName: "Upload Image URL", fieldValue: generatedImageData.uploadedImageURL, dataType: "string", isRequiredValue: generatedImageData.service === "image-to-image" },
            { fieldName: "Text Prompt", fieldValue: generatedImageData.textPrompt, dataType: "string", isRequiredValue: generatedImageData.service === "text-to-image" },
            { fieldName: "Category Name", fieldValue: generatedImageData.categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: generatedImageData.styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Painting Type", fieldValue: generatedImageData.paintingType, dataType: "string", isRequiredValue: true },
            { fieldName: "Position", fieldValue: generatedImageData.position, dataType: "string", isRequiredValue: true },
            { fieldName: "Size", fieldValue: generatedImageData.size, dataType: "string", isRequiredValue: true },
            { fieldName: "Is Exist White Border", fieldValue: generatedImageData.isExistWhiteBorder, dataType: "string", isRequiredValue: false },
            { fieldName: "Width", fieldValue: Number(generatedImageData.width), dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: Number(generatedImageData.height), dataType: "number", isRequiredValue: true },
            { fieldName: "Frame Color", fieldValue: generatedImageData.frameColor, dataType: "string", isRequiredValue: false },
        ], res, next);
    },
    generatedImagesController.postNewGeneratedImageData
);

generatedImagesRouter.post("/crop-image",
    async (req, res, next) => {
        const cropingDetails = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Width", fieldValue: Number(cropingDetails.width), dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: Number(cropingDetails.height), dataType: "number", isRequiredValue: true },
            { fieldName: "Top", fieldValue: Number(cropingDetails.top), dataType: "number", isRequiredValue: true },
            { fieldName: "Left", fieldValue: Number(cropingDetails.left), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    generatedImagesController.postImageAfterCroping
);

generatedImagesRouter.delete("/generated-image-data/:generatedImageDataId",
    validateJWT,
    async (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Generated Image Data Id", fieldValue: req.params.generatedImageDataId, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    generatedImagesController.deleteGeneratedImageData
);

module.exports = generatedImagesRouter;