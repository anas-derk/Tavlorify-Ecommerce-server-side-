// Import Generated Image Model Object

const { generatedImageModel } = require("../models/all.models");

async function getAllGeneratedImagesDataInsideThePage(pageNumber, pageSize, service) {
    try {
        return await generatedImageModel.find({ service }).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ imageGenerationDate: -1 });
    }
    catch (err) {
        throw Error(err);
    }
}

async function getGeneratedImagesDataCount(filters) {
    try {
        return await generatedImageModel.countDocuments(filters);
    } catch (err) {
        throw Error(err);
    }
}

async function saveNewGeneratedImageData(generatedImageData) {
    try {
        const newGeneratedImageData = new generatedImageModel(generatedImageData);
        const result = await newGeneratedImageData.save();
        return {
            msg: "Save New Generated Image Data Process Has Been Successfully !!",
            error: false,
            data: result,
        };
    }
    catch (err) {
        throw Error(err);
    }
}

async function deleteGeneratedImageData(generatedImageDataId) {
    try {
        const generatedImageData = await generatedImageModel.findOneAndDelete({ _id: generatedImageDataId });
        if (generatedImageData) {
            return {
                msg: "Deleteting Generated Image Data Process Has Been Succesfuly !!",
                error: false,
                data: {},
            }
        }
        return {
            msg: "Sorry, This Generated Image Is Not Exist !!",
            error: true,
            data: {},
        }
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