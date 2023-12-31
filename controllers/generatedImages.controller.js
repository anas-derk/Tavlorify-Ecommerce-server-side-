async function postNewGeneratedImageData(req, res) {
    try{
        const generatedImageData = req.body;
        const { saveNewGeneratedImageData } = require("../models/generatedImages.model");
        const result = await saveNewGeneratedImage(generatedImageData.generatedImageURL);
        if (result.msg && result.msg === "success file downloaded !!") {
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
        if (!service && (service !== "text-to-image" || service !== "image-to-image")) {
            await res.status(400).json(`Invalid Service Name !!`);
        } else {
            const { getSpecificGeneratedImagesData } = require("../models/generatedImages.model");
            const result = await getSpecificGeneratedImagesData(service);
            await res.json(result);
        }
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function deleteGeneratedImageData(req, res) {
    const generatedImageDataId = req.params.generatedImageDataId;
    if (!generatedImageDataId) res.status(400).json("Please Send Generated Image Data Id !!");
    else {
        const { deleteGeneratedImageData } = require("../models/generatedImages.model");
        try{
            const result = await deleteGeneratedImageData(generatedImageDataId);
            await res.json(result);
        }
        catch(err) {
            await res.status(500).json(err);
        }
    }
}

module.exports = {
    postNewGeneratedImageData,
    postImageAfterCroping,
    getSpecificGeneratedImagesData,
    deleteGeneratedImageData,
}