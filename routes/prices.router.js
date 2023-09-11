const pricesRouter = require("express").Router();

const pricesController = require("../controllers/prices.controller.js");

pricesRouter.get(`/prices-by-product-name`, pricesController.getPricesByProductName);

module.exports = pricesRouter;