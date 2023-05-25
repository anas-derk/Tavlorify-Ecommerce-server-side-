const adminRouter = require("express").Router();

const adminController = require("../controllers/admin.controller");

adminRouter.get("/login", adminController.getAdminLogin);

module.exports = adminRouter;