function getAllCategories(req, res) {
    const { getAllCategories } = require("../models/categories.model");
    getAllCategories().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
}

function addNewCategory(req, res) {
    const categoryType = req.params.categoryType;
    const categoryName = req.body.categoryName.toUpperCase();
    const { addNewCategory } = require("../models/categories.model");
    addNewCategory(categoryType, categoryName).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
}

function addNewSubCategory(req, res) {
    const categoryType = req.params.categoryType;
    const categoryName = req.params.categoryName;
    const subCategoryName = req.body.subCategoryName.toUpperCase();
    const { addNewSubCategory } = require("../models/categories.model");
    addNewSubCategory(categoryType, categoryName, subCategoryName).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
}

function addNewSubCategoryFromSubCategory(req, res) {
    const categoryType = req.params.categoryType;
    const categoryName = req.params.categoryName;
    const subCategoryName = req.params.subCategoryName;
    const subCategoryFromSubCategoryName = req.body.subCategoryFromSubCategoryName.toUpperCase();
    const { addNewSubCategoryFromSubCategory } = require("../models/categories.model");
    addNewSubCategoryFromSubCategory(
        categoryType,
        categoryName,
        subCategoryName,
        subCategoryFromSubCategoryName
    ).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
}

module.exports = {
    getAllCategories,
    addNewCategory,
    addNewSubCategory,
    addNewSubCategoryFromSubCategory,
}