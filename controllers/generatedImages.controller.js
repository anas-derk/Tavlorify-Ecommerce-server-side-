const { getResponseObject, saveNewGeneratedImage } = require("../global/functions");

const generatedImagesManagmentFunctions = require("../models/generatedImages.model");

const sharp = require("sharp");

async function getAllGeneratedImagesDataInsideThePage(req, res) {
    try{
        const { pageNumber, pageSize, service } = req.query;
        await res.json(await generatedImagesManagmentFunctions.getAllGeneratedImagesDataInsideThePage(pageNumber, pageSize, service));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getGeneratedImagesDataCount(req, res) {
    try{
        await res.json(await generatedImagesManagmentFunctions.getGeneratedImagesDataCount(req.query));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewGeneratedImageData(req, res) {
    try{
        const generatedImageData = req.body;
        const result = await saveNewGeneratedImage(generatedImageData.generatedImageURL);
        if (!result.error) {
            const result1 = await generatedImagesManagmentFunctions.saveNewGeneratedImageData({
                ...generatedImageData,
                generatedImageURL: result.data.imagePath,
            });
            await res.json(result1);
        }
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postImageAfterCroping(req, res) {
    try {
        const cropingDetails = req.body;
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
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteGeneratedImageData(req, res) {
    try{
        await res.json(await generatedImagesManagmentFunctions.deleteGeneratedImageData(req.params.generatedImageDataId));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getAllGeneratedImagesDataInsideThePage,
    getGeneratedImagesDataCount,
    postNewGeneratedImageData,
    postImageAfterCroping,
    deleteGeneratedImageData,
}