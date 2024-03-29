const textToImageRouter = require("express").Router();

const textToImageController = require("../controllers/textToTomage.controller");

const multer = require("multer");

const { validateJWT } = require("../middlewares/global.middlewares");

textToImageRouter.get("/categories/all-categories-data", textToImageController.getAllCategoriesData);

textToImageRouter.get("/styles/category-styles-data", textToImageController.get_all_category_styles_data);

textToImageRouter.get("/generate-image", textToImageController.generateImage);

textToImageRouter.post("/categories/add-new-category", validateJWT, multer({
    storage: multer.diskStorage({
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
}, { name: "styleImgFile", maxCount: 1 }]), textToImageController.addNewCategory);

textToImageRouter.post("/styles/add-new-style", validateJWT, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./assets/images/styles/textToImage");
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
}).single("styleImgFile"), textToImageController.addNewStyle);

textToImageRouter.put("/categories/update-category-data/:categoryId", validateJWT, textToImageController.putCategoryData);

textToImageRouter.put("/styles/update-style-data/:styleId", validateJWT, textToImageController.putStyleData);

textToImageRouter.delete("/categories/delete-category-data/:categoryId", validateJWT, textToImageController.deleteCategoryData);

textToImageRouter.delete("/styles/delete-style-data/:styleId", validateJWT, textToImageController.deleteStyleData);

module.exports = textToImageRouter;