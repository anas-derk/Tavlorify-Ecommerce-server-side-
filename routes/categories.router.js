const categoriesRouter = require("express").Router()

const categoriesController = require("../controllers/categories.controller");

categoriesRouter.get("/all-categories", categoriesController.getAllCategories);

categoriesRouter.post("/add-new-category/:categoryType", categoriesController.addNewCategory);

categoriesRouter.post("/add-new-sub-category/:categoryType/:categoryName", categoriesController.addNewSubCategory);

categoriesRouter.post("/add-new-sub-category-from-sub-category/:categoryType/:categoryName/:subCategoryName", categoriesController.addNewSubCategoryFromSubCategory);

module.exports = categoriesRouter;