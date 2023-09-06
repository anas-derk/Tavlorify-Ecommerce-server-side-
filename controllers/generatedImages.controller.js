async function saveNewGeneratedImage(generatedImageURL) {
    const { get } = require('axios');
    const { createWriteStream } = require('fs');
    const randomImageName = `${Math.random()}_${Date.now()}__generatedImage.png`;
    const path = require("path");
    const destination = path.join(__dirname, "..", "assets", "images", "generatedImages", randomImageName);
    try {
        const res = await get(generatedImageURL, { responseType: 'stream' });
        const result = await res.data;
        result.pipe(createWriteStream(destination));
        return { msg: "success file downloaded !!", imageURL: `assets/images/generatedImages/${randomImageName}` };
    }
    catch (err) {
        return err;
    }
}

function postNewGeneratedImageData(req, res) {
    const generatedImageData = req.body;
    // const { saveNewGeneratedImageData } = require("../models/generatedImages.model");
    saveNewGeneratedImage(generatedImageData.generatedImageURL)
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
    // saveNewGeneratedImageData(generatedImageData)
    // .then((result) => {
    //     res.json(result);
    // })
    // .catch((err) => console.log(err));
}

module.exports = {
    postNewGeneratedImageData,
}