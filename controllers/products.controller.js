function postNewProduct(req, res) {
    const bodyData = req.body;
    const productImageSrc = req.file.path;
    const productInfo = {
        ...Object.assign({}, bodyData),
        imageSrc: productImageSrc,
        subjects: bodyData.subjects.split(","),
        styles: bodyData.styles.split(","),
        rooms: bodyData.rooms.split(","),
        colors: bodyData.colors.split(","),
    };
    if (Object.keys(productInfo).length === 0) res.json("Sorry, Please Send Product Info");
    else {
        const { addNewProduct } = require("../models/products.model");
        addNewProduct(productInfo).then((result) => {
            res.json(result);
        })
            .catch((err) => {
                const { unlinkSync } = require("fs");
                unlinkSync(productImageSrc);
                res.json(err);
            });
    }
}

function getProductInfo(req, res) {
    let productId = req.params.productId;
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
    let productId = req.params.productId;
    if (!productId) res.json("Sorry, Please Send User Id !!");
    else {
        const { deleteProduct } = require("../models/products.model");
        deleteProduct(productId).then((imagePath) => {
            const { unlinkSync } = require("fs");
            unlinkSync(imagePath);
            res.json({});
        })
            .catch((err) => res.json(err));
    }
}

function putProduct(req, res) {
    let productId = req.params.productId;
    let newProductData = req.body;
    if (!productId) res.json("Sorry, Please Send User Id !!");
    else {
        const { updateProduct } = require("../models/products.model");
        updateProduct(productId, newProductData).then(() => {
            res.json({});
        })
            .catch((err) => res.json(err));
    }
}

module.exports = {
    postNewProduct,
    getProductInfo,
    deleteProduct,
    getAllProducts,
    putProduct,
}