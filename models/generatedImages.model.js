// Import Generated Image Model Object

const { generatedImageModel } = require("../models/all.models");

async function getGeneratedImagesCount(filters) {
    try {
        return {
            msg: `Get Generated Images Count For ${filters.service} Service Has Been Successfully !!`,
            error: false,
            data: await generatedImageModel.countDocuments(filters)
        }
    } catch (err) {
        throw Error(err);
    }
}

async function getAllGeneratedImagesDataInsideThePage(pageNumber, pageSize, service) {
    try {
        return {
            msg: `Get All Generated Images Data For ${service} Service Process Has Been Successfully !!`,
            error: false,
            data: await generatedImageModel.find({ service }).sort({ imageGenerationDate: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize)
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function saveNewGeneratedImageData(generatedImageData) {
    try {
        return {
            msg: "Save New Generated Image Data Process Has Been Successfully !!",
            error: false,
            data: await (new generatedImageModel(generatedImageData)).save(),
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
    getGeneratedImagesCount,
    getAllGeneratedImagesDataInsideThePage,
    saveNewGeneratedImageData,
    deleteGeneratedImageData,
}