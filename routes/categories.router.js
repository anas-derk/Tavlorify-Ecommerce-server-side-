const categoriesRouter = require("express").Router();

const categoriesController = require("../controllers/categories.controller");

categoriesRouter.get("/all-categories-data", categoriesController.getAllCategoriesData);

categoriesRouter.get("/category-data", categoriesController.getCategoryData);

categoriesRouter.put("/update-style-data/:categoryName/:styleName", categoriesController.putCategoryData);

module.exports = categoriesRouter;