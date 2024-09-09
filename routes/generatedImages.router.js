const generatedImagesRouter = require("express").Router();

const generatedImagesController = require("../controllers/generatedImages.controller");

const { validateJWT, validateServiceName, validateNumbersIsPositive, validateNumbersIsNotFloat, validateIsExistErrorInFiles } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

const { validatePaintingType, validateIsExistWhiteBorder, validatePosition, validateSize, validateFrameColor } = require("../middlewares/generatedImages.middlewares");

const multer = require("multer");

generatedImagesRouter.get("/generate-image-using-text-to-image-service",
    (req, res, next) => {
        const { textPrompt, categoryName, styleName, position, dimentionsInCm, paintingType, isExistWhiteBorder, frameColor, width, height } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Text Prompt", fieldValue: textPrompt, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
            { fieldName: "Position", fieldValue: position, dataType: "string", isRequiredValue: true },
            { fieldName: "Dimentions In Cm", fieldValue: dimentionsInCm, dataType: "string", isRequiredValue: true },
            { fieldName: "Painting Type", fieldValue: paintingType, dataType: "string", isRequiredValue: true },
            { fieldName: "Is Exist White Border", fieldValue: isExistWhiteBorder, dataType: "string", isRequiredValue: true },
            { fieldName: "Frame Color", fieldValue: frameColor, dataType: "string", isRequiredValue: true },
            { fieldName: "Width", fieldValue: Number(width), dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: Number(height), dataType: "number", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validatePosition(req.query.position, res, next),
    (req, res, next) => validateSize(req.query.position, req.query.dimentionsInCm, res, next),
    (req, res, next) => validatePaintingType(req.query.paintingType, res, next),
    (req, res, next) => validateIsExistWhiteBorder(req.query.isExistWhiteBorder, res, next),
    (req, res, next) => validateFrameColor(req.query.frameColor, res, next),
    generatedImagesController.generateImageUsingTextToImageService
);

generatedImagesRouter.get("/generate-image-using-image-to-image-service",
    (req, res, next) => {
        const { imageLink, categoryName, styleName } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Image Link", fieldValue: imageLink, dataType: "string", isRequiredValue: true },
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Name", fieldValue: styleName, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validatePaintingType(req.query.paintingType, res, next),
    (req, res, next) => validateIsExistWhiteBorder(req.query.isExistWhiteBorder, res, next),
    (req, res, next) => validateFrameColor(req.query.frameColor, res, next),
    generatedImagesController.generateImageUsingImageToImageService
);

generatedImagesRouter.get("/generate-image-using-face-swap-service",
    (req, res, next) => {
        const { imageLink, styleImageLink } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Image Link", fieldValue: imageLink, dataType: "string", isRequiredValue: true },
            { fieldName: "Style Image Link", fieldValue: styleImageLink, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    generatedImagesController.generateImageUsingFaceSwapService
);

generatedImagesRouter.post("/upload-image-and-processing",
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
    validateIsExistErrorInFiles,
    generatedImagesController.uploadImageAndProcessing
);

generatedImagesRouter.get("/generated-images-count",
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: req.query.service, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateServiceName(req.query.service, res, next),
    generatedImagesController.getGeneratedImagesCount
);

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
    (req, res, next) => validateNumbersIsPositive([req.query.pageNumber, req.query.pageSize], res, next, ["Sorry, Please Send Valid Page Number ( Number Must Be Greater Than Zero ) !!", "Sorry, Please Send Valid Page Size ( Number Must Be Greater Than Zero ) !!"]),
    (req, res, next) => validateNumbersIsNotFloat([req.query.pageNumber, req.query.pageSize], res, next, ["Sorry, Please Send Valid Page Number ( Number Must Be Not Float ) !!", "Sorry, Please Send Valid Page Size ( Number Must Be Not Float ) !!"]),
    generatedImagesController.getAllGeneratedImagesDataInsideThePage
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
    (req, res, next) => validateServiceName(req.body.service, res, next),
    (req, res, next) => validatePaintingType(req.body.paintingType, res, next),
    (req, res, next) => validatePosition(req.body.position, res, next),
    (req, res, next) => validateSize(req.query.position, req.query.dimentionsInCm, res, next),
    (req, res, next) => validateIsExistWhiteBorder(req.body.isExistWhiteBorder, res, next),
    (req, res, next) => validateFrameColor(req.body.frameColor, res, next),
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