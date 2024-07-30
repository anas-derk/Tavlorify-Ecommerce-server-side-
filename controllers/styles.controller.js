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
        res.json(await stylesManagmentFunctions.addNewStyle({
            ...Object.assign({}, req.body),
            imgSrc: req.file.path,
        }));
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

async function putStyleImage(req, res) {
    try{
        const result = await stylesManagmentFunctions.updateStyleImagePath(req.query.styleId, req.file.path);
        if (!result.error) {
            unlinkSync(result.data.imgSrc);
        }
        res.json(result);
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteStyleData(req, res) {
    try{
        const result = await stylesManagmentFunctions.deleteStyleData(req.params.styleId);
        if (!result.error) {
            unlinkSync(result.data.imgSrc);
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
    putStyleImage,
    deleteStyleData
}