const generatedImagesRouter = require("express").Router();

const generatedImagesController = require("../controllers/generatedImages.controller");

generatedImagesRouter.post("/save-new-generated-image-data", generatedImagesController.postNewGeneratedImageData);

generatedImagesRouter.get("/specific-generated-images-data", generatedImagesController.getSpecificGeneratedImagesData);

module.exports = generatedImagesRouter;