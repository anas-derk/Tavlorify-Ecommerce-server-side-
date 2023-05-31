function postNewProduct(req, res) {
    let productInfo = req.body;
    if (!productInfo) res.json("Sorry, Please Send Product Info");
    else {
        const { addNewProduct } = require("../models/products.model");
        addNewProduct(newUserData).then((result) => {
            res.json(result);
        })
            .catch((err) => res.json(err));
    }
}

function getProductInfo(req, res) {
    let productId = req.query.productId;
    if (!productId) res.json("Sorry, Please Send User Id !!");
    else {
        const { getProductInfo } = require("../models/products.model");
        getProductInfo(productId).then((result) => {
            res.json(result);
        })
            .catch((err) => res.json(err));
    }
}

function getAllProducts(req, res) {
    const { getAllProducts } = require("../models/products.model");
    getAllProducts().then((result) => {
        res.json(result);
    })
        .catch((err) => res.json(err));
}

function deleteProduct(req, res) {
    let productId = req.query.productId;
    if (!productId) res.json("Sorry, Please Send User Id !!");
    else {
        const { deleteProduct } = require("../models/products.model");
        deleteProduct(productId).then((result) => {
            res.json(result);
        })
            .catch((err) => res.json(err));
    }
}

module.exports = {
    postNewProduct,
    getProductInfo,
    deleteProduct,
    getAllProducts,
}