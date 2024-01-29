const faceSwapRouter = require("express").Router();

const faceSwapController = require("../controllers/faceSwap.controller");

faceSwapRouter.get("/generate-image", faceSwapController.generateImage);

faceSwapRouter.get("/styles/category-styles-data", faceSwapController.getAllCategoryStylesData);

module.exports = faceSwapRouter;