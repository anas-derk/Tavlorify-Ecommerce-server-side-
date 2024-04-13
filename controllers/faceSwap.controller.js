const { getResponseObject, saveNewGeneratedImage } = require("../global/functions");

const faceSwapPerationsManagmentFunctions = require("../models/faceSwapStyle.model");

const Replicate = require("replicate");

async function runModel(model, input) {
    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });
        const output = await replicate.run(
            model, { input, },
        );
        return output;
    } catch (err) {
        throw Error(err);
    }
}

async function generateImage(req, res) {
    const faceSwapInfo = req.query;
    try {
        const output = await runModel("yan-ops/face_swap:d5900f9ebed33e7ae08a07f17e0d98b4ebc68ab9528a70462afc3899cfe23bab",
            {
                local_source: faceSwapInfo.imageLink,
                local_target: faceSwapInfo.styleImageLink,
            }
        );
        if (output.status === "succeed") {
            const result = await saveNewGeneratedImage(output.image);
            if (!result.error) {
                await res.json({
                    msg: "Generating Image From Image For Face Swap Service Process Has Been Successfully !!",
                    error: false,
                    data: result.data.imagePath,
                });
                return;
            }
        }
        await res.status(500).json(err);
    } catch (err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getAllCategoryStylesData(req, res) {
    try{
        await res.json(await faceSwapPerationsManagmentFunctions.getAllCategoryStylesData(req.query.categoryName));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function addNewStyle(req, res) {
    try{
        const uploadError = req.uploadError;
        if (uploadError) {
            await res.status(400).json(getResponseObject(uploadError, true, {}));
            return;
        }
        const styleImageFiles = {...Object.assign({}, req.files)};
        const imagePaths = [
            styleImageFiles.verticalStyleImage[0].path,
            styleImageFiles.horizontalStyleImage[0].path,
            styleImageFiles.squareStyleImage[0].path,
        ];
        await res.json(await faceSwapPerationsManagmentFunctions.addNewStyle(imagePaths, req.query.categoryName));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    generateImage,
    getAllCategoryStylesData,
    addNewStyle,
}