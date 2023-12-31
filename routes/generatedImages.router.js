const generatedImagesRouter = require("express").Router();

const generatedImagesController = require("../controllers/generatedImages.controller");

generatedImagesRouter.post("/save-new-generated-image-data", generatedImagesController.postNewGeneratedImageData);

generatedImagesRouter.post("/crop-image", generatedImagesController.postImageAfterCroping);

generatedImagesRouter.get("/specific-generated-images-data", generatedImagesController.getSpecificGeneratedImagesData);

generatedImagesRouter.delete("/generated-image-data/:generatedImageDataId", generatedImagesController.deleteGeneratedImageData);

module.exports = generatedImagesRouter;