// Import Mongoose And Generated Image Model Object

const { mongoose, generatedImageModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function saveNewGeneratedImageData(generatedImageData) {
    try {
        await mongoose.connect(DB_URL);
        const newGeneratedImageData = new generatedImageModel(generatedImageData);
        const result = await newGeneratedImageData.save();
        await mongoose.disconnect();
        return result;
    }
    catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function getSpecificGeneratedImagesData(service) {
    try {
        await mongoose.connect(DB_URL);
        const generatedImagesData = await generatedImageModel.find({ service: service }).sort({ imageGegenerationDate: -1 });
        await mongoose.disconnect();
        return generatedImagesData;
    }
    catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function deleteGeneratedImageData(generatedImageDataId) {
    try {
        await mongoose.connect(DB_URL);
        await generatedImageModel.findOneAndDelete({ _id: generatedImageDataId });
        await mongoose.disconnect();
        return "Deleteting Generated Image Data Has Been Succesfuly !!";
    }
    catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    saveNewGeneratedImageData,
    getSpecificGeneratedImagesData,
    deleteGeneratedImageData,
}