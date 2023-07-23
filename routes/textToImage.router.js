const textToImageRouter = require("express").Router();

const textToImageController = require("../controllers/textToTomage.controller");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/images/categories/textToImage");
    },
    filename: (req, file, cb) => {
        cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
    },
});

textToImageRouter.get("/categories/all-categories-data", textToImageController.getAllCategoriesData);

textToImageRouter.post("/categories/add-new-category", multer({ storage }).single("imgSrc"), textToImageController.addNewCategory);

textToImageRouter.get("/styles/category-styles-data", textToImageController.get_all_category_Styles_Data);

textToImageRouter.put("/styles/update-style-data/:styleId", textToImageController.putStyleData);

textToImageRouter.get("/generate-image", textToImageController.generateImage);

module.exports = textToImageRouter;