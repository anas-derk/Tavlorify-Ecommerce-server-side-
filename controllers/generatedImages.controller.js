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
    const generatedImageData = req.body;
    const { saveNewGeneratedImageData } = require("../models/generatedImages.model");
    try{
        const result = await saveNewGeneratedImage(generatedImageData.generatedImageURL);
        if (result.msg && result.msg === "success file downloaded !!") {
            const result1 = await saveNewGeneratedImageData({
                ...generatedImageData,
                generatedImageURL: result.imagePath,
            });
            res.json(result1);
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
}

function getSpecificGeneratedImagesData(req, res) {
    const service = req.query.service;
    if (!service && (service !== "text-to-image" || service !== "image-to-image")) {
        res.status(400).json(`Invalid Service Name !!`);
    } else {
        const { getSpecificGeneratedImagesData } = require("../models/generatedImages.model");
        getSpecificGeneratedImagesData(service)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
    }
}

function deleteGeneratedImageData(req, res) {
    const generatedImageDataId = req.params.generatedImageDataId;
    if (!generatedImageDataId) res.status(400).json("Please Send Generated Image Data Id !!");
    else {
        const { deleteGeneratedImageData } = require("../models/generatedImages.model");
        deleteGeneratedImageData(generatedImageDataId)
        .then((res) => {
            res.json("Deleteting Generated Image Data Has Been Succesfuly !!");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}

module.exports = {
    postNewGeneratedImageData,
    getSpecificGeneratedImagesData,
    deleteGeneratedImageData,
}