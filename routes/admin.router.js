const adminRouter = require("express").Router();

const adminController = require("../controllers/admin.controller");

const multer = require("multer");

function checkServiceName(req, res, next) {
    const serviceNameAndStyleId = req.query;
    if ((serviceNameAndStyleId.service === "text-to-image" || serviceNameAndStyleId.service === "image-to-image") &&serviceNameAndStyleId.styleId) next();
    else res.status(400).json("service name uncorrect or not found, or styleId not found !!");
}

adminRouter.get("/login", adminController.getAdminLogin);

adminRouter.put("/update-style-image", checkServiceName, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (req.query.service === "text-to-image") {
                cb(null, "./assets/images/styles/textToImage");
            }
            else if (req.query.service === "image-to-image") {
                cb(null, "./assets/images/styles/imageToImage");
            }
        },
        filename: (req, file, cb) => {
            cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
        },
    })
}).single("styleImage"), adminController.putStyleImage);

module.exports = adminRouter;