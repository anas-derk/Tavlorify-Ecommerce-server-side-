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
    const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
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
            }
        }
        else await res.status(500).json(err);
    } catch (err) {
        console.log(err);
        await res.status(500).json(err);
    }
}

async function getAllCategoryStylesData(req, res) {
    try{
        const categoryName = req.query.categoryName;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Category Name", fieldValue: categoryName, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { getAllCategoryStylesData } = require("../models/faceSwapStyle.model");
        const result = await getAllCategoryStylesData(categoryName);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function addNewStyle(req, res) {
    try{
        const styleImageFiles = {...Object.assign({}, req.files)};
        const imagePaths = [
            styleImageFiles.verticalStyleImage[0].path,
            styleImageFiles.horizontalStyleImage[0].path,
            styleImageFiles.squareStyleImage[0].path,
        ];
        const categoryName = req.query.categoryName;
        const { addNewStyle } = require("../models/faceSwapStyle.model");
        const result = await addNewStyle(imagePaths, categoryName);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    generateImage,
    getAllCategoryStylesData,
    addNewStyle,
}