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
    const categoryName = req.body.categoryName.toUpperCase();
    const { addNewCategory } = require("../models/categories.model");
    addNewCategory(categoryName).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
}

function addNewSubCategory(req, res) {
    const categoryName = req.params.categoryName;
    const subCategoryName = req.body.subCategoryName.toUpperCase();
    const { addNewSubCategory } = require("../models/categories.model");
    addNewSubCategory(categoryName, subCategoryName).then((result) => {
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
}