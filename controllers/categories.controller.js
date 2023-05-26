function getAllCategoriesData(req, res) {
    const { getAllCategoriesData } = require("../models/categories.model");
    getAllCategoriesData()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

module.exports = {
    getAllCategoriesData,
}