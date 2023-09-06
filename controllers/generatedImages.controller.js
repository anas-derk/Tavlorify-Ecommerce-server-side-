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

module.exports = {
    postNewGeneratedImageData,
}