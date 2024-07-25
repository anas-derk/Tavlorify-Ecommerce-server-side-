const adminRouter = require("express").Router();

const adminController = require("../controllers/admins.controller");

const { validateJWT, validateEmail, validatePassword, validateServiceName } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

const multer = require("multer");

adminRouter.get("/login",
    (req, res, next) => {
        const { email, password } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Email", fieldValue: email, dataType: "string", isRequiredValue: true },
            { fieldName: "Password", fieldValue: password, dataType: "string", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateEmail(req.query.email, res, next),
    (req, res, next) => validatePassword(req.query.password, res, next),
    adminController.getAdminLogin
);

adminRouter.get("/user-info",  validateJWT, adminController.getAdminUserInfo);

adminRouter.put("/update-style-image",
    validateJWT,
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Style Id", fieldValue: req.query.styleId, dataType: "ObjectId", isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateServiceName(req.query.service, res, next),
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