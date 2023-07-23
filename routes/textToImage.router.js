const textToImageRouter = require("express").Router();

const textToImageController = require("../controllers/textToTomage.controller");

const multer = require("multer");

textToImageRouter.get("/categories/all-categories-data", textToImageController.getAllCategoriesData);

textToImageRouter.post("/categories/add-new-category", multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "categoryImgFile") {
            cb(null, "./assets/images/categories/textToImage");
        }
        else if (file.fieldname === "styleImgFile") {
            cb(null, "./assets/images/styles/textToImage");
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
    },
})}).fields([{
    name: "categoryImgFile",
    maxCount: 1,
}, { name: "styleImgFile", maxCount: 1 }]), textToImageController.addNewCategory);

textToImageRouter.get("/styles/category-styles-data", textToImageController.get_all_category_Styles_Data);

textToImageRouter.post("/styles/add-new-style", multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/images/styles/textToImage");
    },
    filename: (req, file, cb) => {
        cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
    },
})}).single("styleImgFile") , textToImageController.addNewStyle);

textToImageRouter.put("/styles/update-style-data/:styleId", textToImageController.putStyleData);

textToImageRouter.get("/generate-image", textToImageController.generateImage);

module.exports = textToImageRouter;