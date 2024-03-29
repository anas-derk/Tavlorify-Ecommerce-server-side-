const pricesRouter = require("express").Router();

const pricesController = require("../controllers/prices.controller.js");

pricesRouter.get(`/prices-by-product-name`, pricesController.getPricesByProductName);

pricesRouter.get(`/prices-by-product-details`, pricesController.getPriceByProductDetails);

pricesRouter.put(`/update-product-price/:productId`, pricesController.putProductPrice);

module.exports = pricesRouter;