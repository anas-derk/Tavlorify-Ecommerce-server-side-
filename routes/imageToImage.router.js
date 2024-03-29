const imageToImageRouter = require("express").Router();

const imageToImageController = require("../controllers/imageToImage.controller");

const multer = require("multer");

imageToImageRouter.get("/generate-image", imageToImageController.generateImage);

imageToImageRouter.get("/categories/all-categories-data", imageToImageController.getAllCategoriesData);

imageToImageRouter.get("/styles/category-styles-data", imageToImageController.get_all_category_Styles_Data);

imageToImageRouter.post("/upload-image-and-processing", multer({
    storage: multer.memoryStorage(),
}).single("imageFile"), imageToImageController.uploadImageAndProcessing);

imageToImageRouter.post("/categories/add-new-category", multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "categoryImgFile") {
                cb(null, "./assets/images/categories/imageToImage");
            }
            else if (file.fieldname === "styleImgFile") {
                cb(null, "./assets/images/styles/imageToImage");
            }
        },
        filename: (req, file, cb) => {
            cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
        },
    })
}).fields([{
    name: "categoryImgFile",
    maxCount: 1,
}, { name: "styleImgFile", maxCount: 1 }]), imageToImageController.addNewCategory);

imageToImageRouter.post("/styles/add-new-style", multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./assets/images/styles/imageToImage");
        },
        filename: (req, file, cb) => {
            cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
        },
    })
}).single("styleImgFile"), imageToImageController.addNewStyle);

imageToImageRouter.put("/categories/update-category-data/:categoryId", imageToImageController.putCategoryData);

imageToImageRouter.put("/styles/update-style-data/:styleId", imageToImageController.putStyleData);

imageToImageRouter.delete("/categories/delete-category-data/:categoryId", imageToImageController.deleteCategoryData);

imageToImageRouter.delete("/styles/delete-style-data/:styleId", imageToImageController.deleteStyleData);

module.exports = imageToImageRouter;