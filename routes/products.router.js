const productsRouter = require("express").Router();

const productsController = require("../controllers/products.controller");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/images/products");
    },
    filename: (req, file, cb) => {
        cb(null, `${Math.random()}_${Date.now()}__${file.originalname}`);
    },
});

productsRouter.post("/add-new-product", multer({ storage }).single("imageSrc"), productsController.postNewProduct);

productsRouter.get("/product-info/:productId", productsController.getProductInfo);

productsRouter.get("/all-products", productsController.getAllProducts);

productsRouter.delete("/:productId", productsController.deleteProduct);

productsRouter.put("/:productId", productsController.putProduct);

module.exports = productsRouter;