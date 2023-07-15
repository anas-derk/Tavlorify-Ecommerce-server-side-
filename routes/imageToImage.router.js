const imageToImageRouter = require("express").Router();

const imageToImageController = require("../controllers/imageToImage.controller");

imageToImageRouter.get("/categories/all-categories-data", imageToImageController.getAllCategoriesData);

imageToImageRouter.get("/styles/category-styles-data", imageToImageController.get_all_category_Styles_Data);

// imageToImageRouter.get("/generate-image", imageToImageController.generateImage);

module.exports = imageToImageRouter;