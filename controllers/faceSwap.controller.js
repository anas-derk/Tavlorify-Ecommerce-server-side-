const { getResponseObject, checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");

async function runModel(model, input) {
    try {
        const Replicate = require("replicate");
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
    const checkResult = checkIsExistValueForFieldsAndDataTypes([
        { fieldName: "Image Link", fieldValue: faceSwapInfo.imageLink, dataType: "string", isRequiredValue: true },
        { fieldName: "Style Image Link", fieldValue: faceSwapInfo.styleImageLink, dataType: "string", isRequiredValue: true },
    ]);
    if (checkResult) {
        await res.status(400).json(checkResult);
        return;
    }
    try {
        const output = await runModel("yan-ops/face_swap:d5900f9ebed33e7ae08a07f17e0d98b4ebc68ab9528a70462afc3899cfe23bab",
            {
                local_source: faceSwapInfo.imageLink,
                local_target: faceSwapInfo.styleImageLink,
            }
        );
        if (output.status === "succeed") {
            const { saveNewGeneratedImage } = require("../global/functions");
            const result = await saveNewGeneratedImage(output.image);
            if (result.msg && result.msg === "success file downloaded !!") {
                await res.json(result.imagePath);
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
        const categoryName = req.query.categoryName;
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { getAllCategoryStylesData } = require("../models/faceSwapStyle.model");
        await res.json(await getAllCategoryStylesData(categoryName));
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
        const categoryName = req.query.categoryName;
        const { addNewStyle } = require("../models/faceSwapStyle.model");
        await res.json(await addNewStyle(imagePaths, categoryName));
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