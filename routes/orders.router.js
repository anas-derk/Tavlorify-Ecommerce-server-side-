const ordersRouter = require("express").Router();

const ordersController = require("../controllers/orders.controller");

ordersRouter.post("/send-order-to-gelato", ordersController.postNewOrder);

module.exports = ordersRouter;