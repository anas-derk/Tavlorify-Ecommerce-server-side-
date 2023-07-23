const textToImageRouter = require("express").Router();

const textToImageController = require("../controllers/textToTomage.controller");

const upload = require("../global/multer.config");

textToImageRouter.get("/categories/all-categories-data", textToImageController.getAllCategoriesData);

textToImageRouter.post("/categories/add-new-category", upload.single("imgSrc"), textToImageController.addNewCategory);

textToImageRouter.get("/styles/category-styles-data", textToImageController.get_all_category_Styles_Data);

textToImageRouter.put("/styles/update-style-data/:styleId", textToImageController.putStyleData);

textToImageRouter.get("/generate-image", textToImageController.generateImage);

module.exports = textToImageRouter;