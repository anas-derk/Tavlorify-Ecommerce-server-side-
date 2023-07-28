function addNewCategory(req, res) {
    const categoryName = req.body.categoryName;
    const { addNewCategory } = require("../models/categories.model");
    addNewCategory(categoryName).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
}

module.exports = {
    addNewCategory,
}