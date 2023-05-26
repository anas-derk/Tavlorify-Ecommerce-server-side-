function getCategoryData(req, res) {
    let categoryName = req.query.categoryName;
    const { getCategoryData } = require("../models/categories.model");
    getCategoryData(categoryName)
        .then((result) => res.json(result))
        .catch((err) => req.status(500).json(err));
}

function getAllCategoriesData(req, res) {
    const { getAllCategoriesData } = require("../models/categories.model");
    getAllCategoriesData()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function putCategoryData(req, res) {
    let categoryName = req.params.categoryName,
        styleName = req.params.styleName;
    let newPrompt = req.body.newPrompt,
        newNegativePrompt = req.body.newNegativePrompt;
    const { updateStyleData } = require("../models/categories.model");
    updateStyleData(categoryName, styleName, newPrompt, newNegativePrompt)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

module.exports = {
    getCategoryData,
    putCategoryData,
    getAllCategoriesData,
}