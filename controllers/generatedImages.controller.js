async function postNewGeneratedImageData(req, res) {
    try{
        const generatedImageData = req.body;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
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
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { saveNewGeneratedImage } = require("../global/functions");
        const result = await saveNewGeneratedImage(generatedImageData.generatedImageURL);
        if (result.msg && result.msg === "success file downloaded !!") {
            const { saveNewGeneratedImageData } = require("../models/generatedImages.model");
            const result1 = await saveNewGeneratedImageData({
                ...generatedImageData,
                generatedImageURL: result.imagePath,
            });
            await res.json(result1);
        }
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function postImageAfterCroping(req, res) {
    try {
        const cropingDetails = req.body;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Width", fieldValue: Number(cropingDetails.width), dataType: "number", isRequiredValue: true },
            { fieldName: "Height", fieldValue: Number(cropingDetails.height), dataType: "number", isRequiredValue: true },
            { fieldName: "Top", fieldValue: Number(cropingDetails.top), dataType: "number", isRequiredValue: true },
            { fieldName: "Left", fieldValue: Number(cropingDetails.left), dataType: "number", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const sharp = require("sharp");
        const imagePath = `assets/images/cropedImages/cropedImage${Math.random()}_${Date.now()}__.png`;
        const imageBuffer = sharp(cropingDetails.imagePath);
        const { width, height } = await imageBuffer.metadata();
        if (width < height) {
            await imageBuffer.resize({ fit: "cover", width: cropingDetails.width, height: null })
                .extract({ width: cropingDetails.width, height: cropingDetails.height, left: cropingDetails.left, top: cropingDetails.top })
                .toFile(imagePath);
        } else if (width > height) {
            await imageBuffer.resize({ fit: "cover", width: null, height: cropingDetails.height })
                .extract({ width: cropingDetails.width, height: cropingDetails.height, left: cropingDetails.left, top: cropingDetails.top })
                .toFile(imagePath);
        }
        await res.json(imagePath);
    }
    catch (err) {
        await res.status(500).json(err);
    }
}

async function getSpecificGeneratedImagesData(req, res) {
    try{
        const service = req.query.service;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Service Name", fieldValue: service, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        if (service !== "text-to-image" || service !== "image-to-image") {
            await res.status(400).json(`Invalid Service Name !!`);
            return;
        }
        const { getSpecificGeneratedImagesData } = require("../models/generatedImages.model");
        const result = await getSpecificGeneratedImagesData(service);
        await res.json(result);
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function deleteGeneratedImageData(req, res) {
    try{
        const generatedImageDataId = req.params.generatedImageDataId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Generated Image Data Id", fieldValue: generatedImageDataId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { deleteGeneratedImageData } = require("../models/generatedImages.model");
        const result = await deleteGeneratedImageData(generatedImageDataId);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    postNewGeneratedImageData,
    postImageAfterCroping,
    getSpecificGeneratedImagesData,
    deleteGeneratedImageData,
}