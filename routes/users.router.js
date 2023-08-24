const usersRouter = require("express").Router();

const usersController = require("../controllers/users.controller");

usersRouter.post("/create-new-user", usersController.createNewUser);

usersRouter.get("/login", usersController.login);

usersRouter.get("/user-info/:userId", usersController.getUserInfo);

usersRouter.get("/all-users", usersController.getAllUsers);

usersRouter.put("/update-user-info/:userId", usersController.putUserInfo);

usersRouter.post("/generated-image-and-info-it", usersController.postGeneratedImageAndInfoIt);

usersRouter.post("/crop-image", usersController.postImageAfterCroping);

module.exports = usersRouter;