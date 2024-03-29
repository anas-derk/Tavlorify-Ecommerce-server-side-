const imageToImageRouter = require("express").Router();

const imageToImageController = require("../controllers/imageToImage.controller");

const multer = require("multer");

const { validateJWT } = require("../middlewares/global.middlewares");

imageToImageRouter.get("/generate-image", imageToImageController.generateImage);

imageToImageRouter.get("/categories/all-categories-data", imageToImageController.getAllCategoriesData);

imageToImageRouter.get("/styles/category-styles-data", imageToImageController.get_all_category_Styles_Data);

imageToImageRouter.post("/upload-image-and-processing", multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (!file) {
            req.uploadError = "Sorry, No File Uploaded, Please Upload The File";
            return cb(null, false);
        }
        if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/png" &&
            file.mimetype !== "image/webp"
        ){
            req.uploadError = "Sorry, Invalid File Mimetype, Only JPEG and PNG Or WEBP files are allowed !!";
            return cb(null, false);
        }
        cb(null, true);
    }
}).single("imageFile"), imageToImageController.uploadImageAndProcessing);

imageToImageRouter.post("/categories/add-new-category", validateJWT, multer({
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
    }),
    fileFilter: (req, file, cb) => {
        if (!file) {
            req.uploadError = "Sorry, No File Uploaded, Please Upload The File";
            return cb(null, false);
        }
        if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/png" &&
            file.mimetype !== "image/webp"
        ){
            req.uploadError = "Sorry, Invalid File Mimetype, Only JPEG and PNG Or WEBP files are allowed !!";
            return cb(null, false);
        }
        cb(null, true);
    }
}).fields([{
    name: "categoryImgFile",
    maxCount: 1,
}, { name: "styleImgFile", maxCount: 1 }]), imageToImageController.addNewCategory);

imageToImageRouter.post("/styles/add-new-style", validateJWT, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./assets/images/styles/imageToImage");
        },
        filename: (req, file, cb) => {
            cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!file) {
            req.uploadError = "Sorry, No File Uploaded, Please Upload The File";
            return cb(null, false);
        }
        if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/png" &&
            file.mimetype !== "image/webp"
        ){
            req.uploadError = "Sorry, Invalid File Mimetype, Only JPEG and PNG Or WEBP files are allowed !!";
            return cb(null, false);
        }
        cb(null, true);
    }
}).single("styleImgFile"), imageToImageController.addNewStyle);

imageToImageRouter.put("/categories/update-category-data/:categoryId", validateJWT, imageToImageController.putCategoryData);

imageToImageRouter.put("/styles/update-style-data/:styleId", validateJWT, imageToImageController.putStyleData);

imageToImageRouter.delete("/categories/delete-category-data/:categoryId", validateJWT, imageToImageController.deleteCategoryData);

imageToImageRouter.delete("/styles/delete-style-data/:styleId", validateJWT, imageToImageController.deleteStyleData);

module.exports = imageToImageRouter;