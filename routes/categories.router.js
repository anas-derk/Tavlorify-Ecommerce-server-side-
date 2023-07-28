const categoriesRouter = require("express").Router()

const categoriesController = require("../controllers/categories.controller");

categoriesRouter.post("/add-new-category", categoriesController.addNewCategory);

module.exports = categoriesRouter;