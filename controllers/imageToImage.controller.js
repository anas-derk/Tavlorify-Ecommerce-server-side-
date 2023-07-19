function getAllCategoriesData(req, res) {
    const { getAllCategoriesData } = require("../models/imageToImageCategories.model");
    getAllCategoriesData()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function get_all_category_Styles_Data(req, res) {
    let categoryName = req.query.categoryName;
    const { get_all_category_Styles_Data } = require("../models/imageToImageStyles.model");
    get_all_category_Styles_Data(categoryName)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

module.exports = {
    getAllCategoriesData,
    get_all_category_Styles_Data,
}