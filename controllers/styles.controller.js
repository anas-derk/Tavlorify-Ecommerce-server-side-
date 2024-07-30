const { getResponseObject } = require("../global/functions");

const stylesManagmentFunctions = require("../models/styles.model");

const { unlinkSync } = require("fs");

async function getAllCategoryStylesData(req, res) {
    try{
        const { service, categoryName } = req.query;
        res.json(await stylesManagmentFunctions.getAllCategoryStylesData(service, categoryName));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function addNewStyle(req, res) {
    try{
        const uploadError = req.uploadError;
        if (uploadError) {
            res.status(400).json(getResponseObject(uploadError, true, {}));
            return;
        }
        const styleData = {
            ...Object.assign({}, req.body),
            imgSrc: req.file.path,
        };
        res.json(await stylesManagmentFunctions.addNewStyle(styleData));
    }
    catch(err){
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putStyleData(req, res) {
    try{
        const { service, categoryName } = req.query;
        res.json(await stylesManagmentFunctions.updateStyleData(service, req.params.styleId, categoryName, req.body));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteStyleData(req, res) {
    try{
        const result = await stylesManagmentFunctions.deleteStyleData(req.params.styleId);
        if (!result.error) {
            unlinkSync(result.data);
        }
        res.json(result);
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getAllCategoryStylesData,
    addNewStyle,
    putStyleData,
    deleteStyleData
}