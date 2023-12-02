const usersRouter = require("express").Router();

const usersController = require("../controllers/users.controller");

usersRouter.post("/crop-image", usersController.postImageAfterCroping);

module.exports = usersRouter;