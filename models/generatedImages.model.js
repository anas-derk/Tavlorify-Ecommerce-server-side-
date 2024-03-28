// Import Generated Image Model Object

const { generatedImageModel } = require("../models/all.models");

async function getAllGeneratedImagesDataInsideThePage(service, pageNumber, pageSize) {
    try {
        const generatedImagesData = await generatedImageModel.find({ service }).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ imageGenerationDate: -1 });
        return generatedImagesData;
    }
    catch (err) {
        throw Error(err);
    }
}

async function getGeneratedImagesDataCount(filters) {
    try {
        const generatedImagesCount = await generatedImageModel.countDocuments(filters);
        return generatedImagesCount;
    } catch (err) {
        throw Error(err);
    }
}

async function saveNewGeneratedImageData(generatedImageData) {
    try {
        const newGeneratedImageData = new generatedImageModel(generatedImageData);
        const result = await newGeneratedImageData.save();
        return result;
    }
    catch (err) {
        throw Error(err);
    }
}

async function deleteGeneratedImageData(generatedImageDataId) {
    try {
        await generatedImageModel.findOneAndDelete({ _id: generatedImageDataId });
        return "Deleteting Generated Image Data Has Been Succesfuly !!";
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllGeneratedImagesDataInsideThePage,
    getGeneratedImagesDataCount,
    saveNewGeneratedImageData,
    deleteGeneratedImageData,
}