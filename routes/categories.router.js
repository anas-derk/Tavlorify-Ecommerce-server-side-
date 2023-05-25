const categoriesRouter = require("express").Router();

const categoriesController = require("../controllers/categories.controller");

categoriesRouter.get("/all-categories-data", categoriesController.getAllCategoriesData);

categoriesRouter.get("/category-data", categoriesController.getCategoryData);

categoriesRouter.get("/update-category-data/:categoryName", categoriesController.getCategoryData);

module.exports = categoriesRouter;