// Import Mongoose And Generated Image Model Object

const { mongoose, generatedImageModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function saveNewGeneratedImageData(generatedImageData) {
    try {
        await mongoose.connect(DB_URL);
        const newGeneratedImageData = new generatedImageModel(generatedImageData);
        await newGeneratedImageData.save();
        await mongoose.disconnect();
        return "Save New Generated Image Data Process Is Successfuly !!";
    }
    catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    saveNewGeneratedImageData,
}