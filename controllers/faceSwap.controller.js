const { getResponseObject } = require("../global/functions");

const faceSwapPerationsManagmentFunctions = require("../models/faceSwapStyle.model");

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
        res.json(await faceSwapPerationsManagmentFunctions.addNewStyle(imagePaths, req.query.categoryName));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getAllCategoryStylesData,
    addNewStyle,
}