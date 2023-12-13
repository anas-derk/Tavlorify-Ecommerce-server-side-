async function getAllReturnedOrdersInsideThePage(req, res) {
    try{
        const filters = req.query;
        for (let objectKey in filters) {
            if (
                objectKey !== "pageNumber" &&
                objectKey !== "pageSize" &&
                objectKey !== "orderNumber" &&
                objectKey !== "_id" &&
                objectKey !== "klarnaReference" &&
                objectKey !== "status" &&
                objectKey !== "customerName" &&
                objectKey !== "email"
            ) { await res.status(400).json("Invalid Request, Please Send Valid Keys !!"); return; }
        }
        const { getAllReturnedOrdersInsideThePage } = require("../models/returnedOrders.model");
        const result = await getAllReturnedOrdersInsideThePage(filters.pageNumber, filters.pageSize, getFiltersObject(filters));
        await res.json(result);
    }
    catch(err) {
        console.log(err);
        await res.status(500).json(err);
    }
}

function getFiltersObject(filters) {
    let filtersObject = {};
    for (let objectKey in filters) {
        if (objectKey === "orderNumber") filtersObject[objectKey] = Number(filters[objectKey]);
        if (objectKey === "_id") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "klarnaReference") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "status") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "customerName") filtersObject[`billing_address.given_name`] = filters[objectKey];
        if (objectKey === "email") filtersObject[`billing_address.email`] = filters[objectKey];
    }
    return filtersObject;
}

async function getReturnedOrdersCount(req, res) {
    try{
        const filters = req.query;
        for (let objectKey in filters) {
            if (
                objectKey !== "pageNumber" &&
                objectKey !== "pageSize" &&
                objectKey !== "orderNumber" &&
                objectKey !== "_id" &&
                objectKey !== "klarnaReference" &&
                objectKey !== "status" &&
                objectKey !== "customerName" &&
                objectKey !== "email"
            ) { await res.status(400).json("Invalid Request, Please Send Valid Keys !!"); return; }
        }
        const { getReturnedOrdersCount } = require("../models/returnedOrders.model");
        await res.json(await getReturnedOrdersCount(getFiltersObject(filters)));
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function getReturnedOrderDetails(req, res) {
    try{
        const orderId = req.params.orderId;
        if (!orderId) await res.status(400).json("Please Send Returned Order Id !!");
        else {
            const { getReturnedOrderDetails } = require("../models/returnedOrders.model");
            await res.json(await getReturnedOrderDetails(orderId));
        }
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function postNewReturnedOrder(req, res) {
    try{
        const { postNewReturnedOrder } = require("../models/returnedOrders.model");
        const result = await postNewReturnedOrder(req.params.orderId);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function putReturnedOrder(req, res) {
    try{
        const returnedOrderId = req.params.orderId;
        const newReturnedOrderDetails = req.body;
        if (!returnedOrderId) await res.status(400).json("Please Send Returned Order Id !!");
        else {
            const { updateReturnedOrder } = require("../models/returnedOrders.model");
            const result = await updateReturnedOrder(returnedOrderId, newReturnedOrderDetails);
            await res.json(result);
        }
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function putReturnedOrderProduct(req, res) {
    try{
        const   returnedOrderId = req.params.orderId,
                returnedProductId = req.params.productId;
        const newReturnedOrderProductDetails = req.body;
        if (!returnedOrderId || !returnedProductId) await res.status(400).json("Please Send Returned Order Id And Product Id !!");
        else {
            const { updateReturnedOrderProduct } = require("../models/returnedOrders.model");
            const result = await updateReturnedOrderProduct(returnedOrderId, returnedProductId, newReturnedOrderProductDetails);
            await res.json(result);
        }
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function deleteReturnedOrder(req, res) {
    try{
        const returnedOrderId = req.params.orderId;
        if (!returnedOrderId) await res.status(400).json("Please Send Returned Order Id !!");
        else {
            const { deleteReturnedOrder } = require("../models/returnedOrders.model");
            const result = await deleteReturnedOrder(returnedOrderId);
            await res.json(result);
        }
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function deleteProductFromReturnedOrder(req, res) {
    try{
        const   returnedOrderId = req.params.orderId,
                productId = req.params.productId;
        if (!returnedOrderId || !productId) await res.status(400).json("Please Send Returned Order Id And Product Id !!");
        else {
            const { deleteProductFromReturnedOrder } = require("../models/returnedOrders.model");
            const result = await deleteProductFromReturnedOrder(returnedOrderId, productId);
            await res.json(result);
        }
    }
    catch(err){
        console.log(err);
        await res.status(500).json(err);
    }
}

module.exports = {
    getAllReturnedOrdersInsideThePage,
    getReturnedOrdersCount,
    getReturnedOrderDetails,
    postNewReturnedOrder,
    putReturnedOrder,
    putReturnedOrderProduct,
    deleteReturnedOrder,
    deleteProductFromReturnedOrder,
}