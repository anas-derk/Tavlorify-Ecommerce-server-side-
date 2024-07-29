const { getResponseObject } = require("../global/functions");

const { saveNewGeneratedImage, saveNewGeneratedImageDataGlobalFunc } = require("../global/functions");

const textToImageCategoriesManagmentFunctions = require("../models/textToImageCategories.model");

const textToImageStylesManagmentFunctions = require("../models/textToImageStyles.model");

const Replicate = require("replicate");

const { unlinkSync } = require("fs");

async function getAllCategoriesData(req, res) {
    try{
        await res.json(await textToImageCategoriesManagmentFunctions.getAllCategoriesData());
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function get_all_category_styles_data(req, res) {
    try{
        await res.json(await textToImageStylesManagmentFunctions.get_all_category_styles_data(req.query.categoryName));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function addNewCategory(req, res) {
    try{
        const uploadError = req.uploadError;
        if (uploadError) {
            await res.status(400).json(getResponseObject(uploadError, true, {}));
            return;
        }
        const categoryInfo = {
            ...Object.assign({}, req.body),
            ...Object.assign({}, req.files),
        };
        await res.json(await textToImageCategoriesManagmentFunctions.addNewCategory(categoryInfo));
    }
    catch(err) {
        unlinkSync(req.files["categoryImgFile"][0].path);
        unlinkSync(req.files["styleImgFile"][0].path);
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
        const styleData = {
            ...Object.assign({}, req.body),
            imgSrc: req.file.path,
        };
        await res.json(await textToImageStylesManagmentFunctions.addNewStyle(styleData));
    }
    catch(err){
        console.log(err)
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putCategoryData(req, res) {
    try{
        await res.json(await textToImageCategoriesManagmentFunctions.updateCategoryData(req.params.categoryId, req.body));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putStyleData(req, res) {
    try{
        await res.json(await textToImageStylesManagmentFunctions.updateStyleData(req.params.styleId, req.query.categoryName, req.body));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteCategoryData(req, res) {
    try{
        const result = await textToImageCategoriesManagmentFunctions.deleteCategoryData(req.params.categoryId);
        if (!result.error) {
            unlinkSync(result.data.categoryData.imgSrc);
            for(let i = 0; i < result.data.categoryStylesData.length; i++) {
                unlinkSync(result.data.categoryStylesData[i].imgSrc);
            }
        }
        await res.json(result);
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteStyleData(req, res) {
    try{
        const result = await textToImageStylesManagmentFunctions.deleteStyleData(req.params.styleId, req.query.categoryName);
        if (!result.error) {
            unlinkSync(result.data);
        }
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getAllCategoriesData,
    get_all_category_styles_data,
    addNewStyle,
    addNewCategory,
    putStyleData,
    putCategoryData,
    deleteStyleData,
    deleteCategoryData,
}