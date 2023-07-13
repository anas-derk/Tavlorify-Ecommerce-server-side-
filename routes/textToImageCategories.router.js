const categoriesRouter = require("express").Router();

const categoriesController = require("../controllers/textToImageCategories.controller");

categoriesRouter.get("/all-categories-data", categoriesController.getAllCategoriesData);

module.exports = categoriesRouter;