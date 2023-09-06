const generatedImagesRouter = require("express").Router();

const generatedImagesController = require("../controllers/generatedImages.controller");

generatedImagesRouter.post("/save-new-generated-image-data", generatedImagesController.postNewGeneratedImageData);

module.exports = generatedImagesRouter;