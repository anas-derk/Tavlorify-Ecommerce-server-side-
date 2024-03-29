const generatedImagesRouter = require("express").Router();

const generatedImagesController = require("../controllers/generatedImages.controller");

const { validateJWT } = require("../middlewares/global.middlewares");

generatedImagesRouter.get("/all-generated-images-inside-the-page", generatedImagesController.getAllGeneratedImagesDataInsideThePage);

generatedImagesRouter.get("/generated-images-count", generatedImagesController.getGeneratedImagesDataCount);

generatedImagesRouter.post("/save-new-generated-image-data", generatedImagesController.postNewGeneratedImageData);

generatedImagesRouter.post("/crop-image", generatedImagesController.postImageAfterCroping);

generatedImagesRouter.delete("/generated-image-data/:generatedImageDataId", validateJWT, generatedImagesController.deleteGeneratedImageData);

module.exports = generatedImagesRouter;