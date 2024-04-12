const { getResponseObject } = require("../global/functions");

const returnedOrdersManagmentFunctions = require("../models/returnedOrders.model");

function getFiltersObject(filters) {
    let filtersObject = {};
    for (let objectKey in filters) {
        if (objectKey === "orderNumber") filtersObject[objectKey] = Number(filters[objectKey]);
        if (objectKey === "_id") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "status") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "customerName") filtersObject[`customer.first_name`] = filters[objectKey];;
        if (objectKey === "email") filtersObject[`customer.email`] = filters[objectKey];
    }
    return filtersObject;
}

async function getReturnedOrdersCount(req, res) {
    try{
        await res.json(await returnedOrdersManagmentFunctions.getReturnedOrdersCount(getFiltersObject(req.query)));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getAllReturnedOrdersInsideThePage(req, res) {
    try{
        const filters = req.query;
        await res.json(await returnedOrdersManagmentFunctions.getAllReturnedOrdersInsideThePage(filters.pageNumber, filters.pageSize, getFiltersObject(filters)));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getReturnedOrderDetails(req, res) {
    try{
        await res.json(await returnedOrdersManagmentFunctions.getReturnedOrderDetails(req.params.orderId));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewReturnedOrder(req, res) {
    try{
        await res.json(await returnedOrdersManagmentFunctions.postNewReturnedOrder(req.params.orderId));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putReturnedOrder(req, res) {
    try{
        await res.json(await returnedOrdersManagmentFunctions.updateReturnedOrder(req.params.orderId, req.body));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putReturnedOrderProduct(req, res) {
    try{
        const returnedOrderAndProductIds = req.params;
        await res.json(await returnedOrdersManagmentFunctions.updateReturnedOrderProduct(returnedOrderAndProductIds.orderId, returnedOrderAndProductIds.productId, req.body));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteReturnedOrder(req, res) {
    try{
        await res.json(await returnedOrdersManagmentFunctions.deleteReturnedOrder(req.params.orderId));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteProductFromReturnedOrder(req, res) {
    try{
        const returnedOrderAndProductIds = req.params;
        await res.json(await returnedOrdersManagmentFunctions.deleteProductFromReturnedOrder(returnedOrderAndProductIds.orderId, returnedOrderAndProductIds.productId));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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