// Import Mongoose And Generated Image Model Object

const { mongoose, generatedImageModel } = require("../models/all.models");

async function getAllGeneratedImagesDataInsideThePage(service, pageNumber, pageSize) {
    try {
        await mongoose.connect(process.env.DB_URL);
        const generatedImagesData = await generatedImageModel.find({ service }).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ imageGenerationDate: -1 });
        await mongoose.disconnect();
        return generatedImagesData;
    }
    catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function getGeneratedImagesDataCount(filters) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const generatedImagesCount = await generatedImageModel.countDocuments(filters);
        await mongoose.disconnect();
        return generatedImagesCount;
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function saveNewGeneratedImageData(generatedImageData) {
    try {
        await mongoose.connect(process.env.DB_URL);
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

async function deleteGeneratedImageData(generatedImageDataId) {
    try {
        await mongoose.connect(process.env.DB_URL);
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
    getAllGeneratedImagesDataInsideThePage,
    getGeneratedImagesDataCount,
    saveNewGeneratedImageData,
    deleteGeneratedImageData,
}