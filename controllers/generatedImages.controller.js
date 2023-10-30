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
    getSpecificGeneratedImagesData,
    deleteGeneratedImageData,
}