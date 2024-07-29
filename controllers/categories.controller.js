const { getResponseObject } = require("../global/functions");

const categoriesManagmentFunctions = require("../models/categories.model");

async function getAllCategoriesData(req, res) {
    try{
        await res.json(await categoriesManagmentFunctions.getAllCategoriesData(req.query.service));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function addNewCategory(req, res) {
    try{
        const uploadError = req.uploadError;
        if (uploadError) {
            res.status(400).json(getResponseObject(uploadError, true, {}));
            return;
        }
        const categoryInfo = {
            ...Object.assign({}, req.body),
            ...Object.assign({}, req.files),
        };
        res.json(await categoriesManagmentFunctions.addNewCategory(req.query.service, categoryInfo));
    }
    catch(err) {
        unlinkSync(req.files["categoryImgFile"][0].path);
        unlinkSync(req.files["styleImgFile"][0].path);
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putCategoryData(req, res) {
    try{
        await res.json(await textToImageCategoriesManagmentFunctions.updateCategoryData(req.query.service, req.params.categoryId, req.body));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteCategoryData(req, res) {
    try{
        const result = await textToImageCategoriesManagmentFunctions.deleteCategoryData(req.query.service, req.params.categoryId);
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

module.exports = {
    getAllCategoriesData,
    addNewCategory,
    putCategoryData,
    deleteCategoryData
}