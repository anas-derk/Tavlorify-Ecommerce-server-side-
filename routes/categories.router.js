const categoriesRouter = require("express").Router()

const categoriesController = require("../controllers/categories.controller");

categoriesRouter.get("/all-categories", categoriesController.getAllCategories);

categoriesRouter.post("/add-new-category", categoriesController.addNewCategory);

categoriesRouter.post("/add-new-sub-category/:categoryName", categoriesController.addNewSubCategory);

module.exports = categoriesRouter;