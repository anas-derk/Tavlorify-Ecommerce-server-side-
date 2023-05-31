const productsRouter = require("express").Router();

const productsController = require("../controllers/products.controller");

productsRouter.post("/add-new-product", productsController.postNewProduct);

productsRouter.get("/:productId", productsController.getProductInfo);

productsRouter.get("/all-products", productsController.getAllProducts);

productsRouter.delete("/:productId", productsController.deleteProduct);

module.exports = productsRouter;