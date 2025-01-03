const { getResponseObject } = require("../global/functions");

const categoriesManagmentFunctions = require("../models/categories.model");

const { unlinkSync } = require("fs");

async function getAllCategoriesData(req, res) {
    try{
        res.json(await categoriesManagmentFunctions.getAllCategoriesData(req.query.service));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function addNewCategory(req, res) {
    try{
        const categoryInfo = {
            ...Object.assign({}, req.body),
            ...Object.assign({}, req.files),
        };
        try{
            res.json(await categoriesManagmentFunctions.addNewCategory(categoryInfo));
        }
        catch(err) {
            unlinkSync(req.files["categoryImgFile"][0].path);
            unlinkSync(req.files["styleImgFile"][0].path);
            res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
        }
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putCategoryData(req, res) {
    try{
        res.json(await categoriesManagmentFunctions.updateCategoryData(req.params.categoryId, req.query.service, req.body));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putCategoryImage(req, res) {
    try{
        const { service } = req.query;
        const result = service !== "face-swap" ? await categoriesManagmentFunctions.updateCategoryImagePath(req.params.categoryId, req.file.path) : await stylesManagmentFunctions.updateFaceSwapStyleImagePath(req.params.styleId, req.file.path, imageIndex);
        if (!result.error) {
            unlinkSync(result.data.imgSrc);
        }
        res.json(result);
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteCategoryData(req, res) {
    try{
        const result = await categoriesManagmentFunctions.deleteCategoryData(req.params.categoryId);
        if (!result.error) {
            unlinkSync(result.data.categoryData.imgSrc);
            for(let i = 0; i < result.data.categoryStylesData.length; i++) {
                unlinkSync(result.data.categoryStylesData[i].imgSrc);
            }
        }
        res.json(result);
    }
    catch(err){
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getAllCategoriesData,
    addNewCategory,
    putCategoryData,
    putCategoryImage,
    deleteCategoryData
}