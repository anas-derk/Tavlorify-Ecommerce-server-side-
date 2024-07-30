const adminRouter = require("express").Router();

const adminController = require("../controllers/admins.controller");

const { validateJWT, validateEmail, validatePassword, validateServiceName } = require("../middlewares/global.middlewares");

const { validateIsExistValueForFieldsAndDataTypes } = require("../global/functions");

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

module.exports = adminRouter;