const categoriesRouter = require("express").Router()

const categoriesController = require("../controllers/categories.controller");

categoriesRouter.get("/all-categories", categoriesController.getAllCategories);

categoriesRouter.post("/add-new-category", categoriesController.addNewCategory);

categoriesRouter.post("/add-new-sub-category/:categoryName", categoriesController.addNewSubCategory);

categoriesRouter.post("/add-new-sub-category-from-sub-category/:categoryName/:subCategoryName", categoriesController.addNewSubCategoryFromSubCategory);

module.exports = categoriesRouter;