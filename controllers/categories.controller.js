async function getAllCategories(req, res) {
    try{
        const { getAllCategories } = require("../models/categories.model");
        const result = await getAllCategories();
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function addNewCategory(req, res) {
    try{
        const categoryType = req.params.categoryType;
        const categoryName = req.body.categoryName.toUpperCase();
        const { addNewCategory } = require("../models/categories.model");
        const result = await addNewCategory(categoryType, categoryName);
        await res.json(result);
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function addNewSubCategory(req, res) {
    try{
        const categoryType = req.params.categoryType;
        const categoryName = req.params.categoryName;
        const subCategoryName = req.body.subCategoryName.toUpperCase();
        const { addNewSubCategory } = require("../models/categories.model");
        const result = await addNewSubCategory(categoryType, categoryName, subCategoryName);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function addNewSubCategoryFromSubCategory(req, res) {
    try{
        const categoryType = req.params.categoryType;
        const categoryName = req.params.categoryName;
        const subCategoryName = req.params.subCategoryName;
        const subCategoryFromSubCategoryName = req.body.subCategoryFromSubCategoryName.toUpperCase();
        const { addNewSubCategoryFromSubCategory } = require("../models/categories.model");
        const result = await addNewSubCategoryFromSubCategory(
            categoryType,
            categoryName,
            subCategoryName,
            subCategoryFromSubCategoryName
        );
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    getAllCategories,
    addNewCategory,
    addNewSubCategory,
    addNewSubCategoryFromSubCategory,
}