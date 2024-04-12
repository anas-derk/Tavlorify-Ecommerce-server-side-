const adminRouter = require("express").Router();

const adminController = require("../controllers/admins.controller");

const { validateJWT, validateEmail } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

const multer = require("multer");

function checkServiceNameAndStyleId(req, res, next) {
    const serviceNameAndStyleId = req.query;
    if (serviceNameAndStyleId.service !== "text-to-image" && serviceNameAndStyleId.service !== "image-to-image") {
        return res.status(400).json(getResponseObject("Sorry, Service Name Uncorrect Or Not Found !!", true, {}));
    }
    if (!serviceNameAndStyleId.styleId) {
        return res.status(400).json(getResponseObject("Sorry, Style Id Uncorrect Or Not Found !!", true, {}));
    }
    next();
}

adminRouter.get("/login",
    async (req, res, next) => {
        const emailAndPassword = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Email", fieldValue: emailAndPassword.email, dataType: "string", isRequiredValue: true },
            { fieldName: "Password", fieldValue: emailAndPassword.password, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateEmail(req.query.email, res, next),
    adminController.getAdminLogin
);

adminRouter.get("/user-info",  validateJWT, adminController.getAdminUserInfo);

adminRouter.put("/update-style-image",
    validateJWT,
    checkServiceNameAndStyleId,
    multer({
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
    }).single("styleImage"),
    adminController.putStyleImage
);

module.exports = adminRouter;