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
        if (req.service === "face-swap") {
            const styleImageFiles = {...Object.assign({}, req.files)};
            res.json(await stylesManagmentFunctions.addNewStyle({
                service: "face-swap",
                ...Object.assign({}, req.body),
                imgSrcList: [
                    styleImageFiles.verticalStyleImage[0].path,
                    styleImageFiles.horizontalStyleImage[0].path,
                    styleImageFiles.squareStyleImage[0].path,
                ],
            }));
            return;
        }
        res.json(await stylesManagmentFunctions.addNewStyle({
            ...Object.assign({}, req.body),
            imgSrc: req.file.path,
        }));
    }
    catch(err){
        console.log(err)
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
        const { service, imageIndex } = req.query;
        const result = service !== "face-swap" ? await stylesManagmentFunctions.updateStyleImagePath(service, req.params.styleId, req.file.path) : await stylesManagmentFunctions.updateFaceSwapStyleImagePath(req.params.styleId, req.file.path, imageIndex);
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

async function deleteFaceSwapStyleData(req, res) {
    try{
        const result = await stylesManagmentFunctions.deleteFaceSwapStyleData(req.params.styleId);
        if (!result.error) {
            for(let imgSrc of result.data.imgSrcList) {
                unlinkSync(imgSrc);
            }
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
    deleteStyleData,
    deleteFaceSwapStyleData
}