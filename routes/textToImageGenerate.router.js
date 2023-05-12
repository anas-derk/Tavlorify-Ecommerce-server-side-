const textToImageGenerateRouter = require("express").Router();

const textToImageGenerateController = require("../controllers/textToImageGenerate.controller");

textToImageGenerateRouter.get("/", textToImageGenerateController.textToImageGenerate);

module.exports = textToImageGenerateRouter;