const faceSwapRouter = require("express").Router();

const faceSwapController = require("../controllers/faceSwap.controller");

const multer = require("multer");

faceSwapRouter.get("/generate-image", faceSwapController.generateImage);

faceSwapRouter.get("/styles/category-styles-data", faceSwapController.getAllCategoryStylesData);

faceSwapRouter.post("/styles/add-new-style", multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./assets/images/styles/faceSwap");
        },
        filename: (req, file, cb) => {
            cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
        },
    })
}).fields([
    {
        name: "verticalStyleImage",
        maxCount: 1},
    {
        name: "horizontalStyleImage",
        maxCount: 1
    },
    {
        name: "squareStyleImage",
        maxCount: 1
    },
]), faceSwapController.addNewStyle);

module.exports = faceSwapRouter;