const textToImageRouter = require("express").Router();

const textToImageController = require("../controllers/textToTomage.controller");

textToImageRouter.get("/categories/all-categories-data", textToImageController.getAllCategoriesData);

textToImageRouter.get("/styles/category-styles-data", textToImageController.get_all_category_Styles_Data);

textToImageRouter.put("/styles/update-style-data/:styleId", textToImageController.putStyleData);

textToImageRouter.get("/generate-image", textToImageController.generateImage);

module.exports = textToImageRouter;