const productsRouter = require("express").Router();

const productsController = require("../controllers/products.controller");

const upload = require("../global/multer.config");

productsRouter.post("/add-new-product", upload.single("imageSrc"), productsController.postNewProduct);

productsRouter.get("/:productId", productsController.getProductInfo);

productsRouter.get("/all-products", productsController.getAllProducts);

productsRouter.delete("/:productId", productsController.deleteProduct);

module.exports = productsRouter;