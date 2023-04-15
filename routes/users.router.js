const usersRouter = require("express").Router();

const usersController = require("../controllers/users.controller");

usersRouter.post("/create-new-user", usersController.createNewUser);

usersRouter.get("/login", usersController.login);

module.exports = usersRouter;