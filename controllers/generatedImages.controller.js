async function saveNewGeneratedImage(generatedImageURL) {
    const { get } = require('axios');
    const { createWriteStream } = require('fs');
    const randomImageName = `${Math.random()}_${Date.now()}__generatedImage.png`;
    const path = require("path");
    const destination = path.join(__dirname, "..", "assets", "images", "generatedImages", randomImageName);
    const res = await get(generatedImageURL, { responseType: 'stream' });
    const result = await res.data;
    result.pipe(createWriteStream(destination));
    return { msg: "success file downloaded !!", imagePath: `assets/images/generatedImages/${randomImageName}` };
}

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
    saveNewGeneratedImage,
    postNewGeneratedImageData,
    getSpecificGeneratedImagesData,
    deleteGeneratedImageData,
}