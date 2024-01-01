async function getAllReturnedOrdersInsideThePage(req, res) {
    try{
        const filters = req.query;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        for (let objectKey in filters) {
            if (
                objectKey !== "pageNumber" &&
                objectKey !== "pageSize" &&
                objectKey !== "orderNumber" &&
                objectKey !== "_id" &&
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
        if (objectKey === "status") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "customerName") filtersObject[`customer.first_name`] = filters[objectKey];;
        if (objectKey === "email") filtersObject[`customer.email`] = filters[objectKey];
    }
    return filtersObject;
}

async function getReturnedOrdersCount(req, res) {
    try{
        const filters = req.query;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: false },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: false },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        for (let objectKey in filters) {
            if (
                objectKey !== "pageNumber" &&
                objectKey !== "pageSize" &&
                objectKey !== "orderNumber" &&
                objectKey !== "_id" &&
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
        const returnedOrderId = req.params.orderId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: returnedOrderId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { getReturnedOrderDetails } = require("../models/returnedOrders.model");
        await res.json(await getReturnedOrderDetails(returnedOrderId));
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function postNewReturnedOrder(req, res) {
    try{
        const orderId = req.params.orderId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: orderId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { postNewReturnedOrder } = require("../models/returnedOrders.model");
        const result = await postNewReturnedOrder(orderId);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function putReturnedOrder(req, res) {
    try{
        const returnedOrderId = req.params.orderId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: returnedOrderId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const newReturnedOrderDetails = req.body;
        const { updateReturnedOrder } = require("../models/returnedOrders.model");
        const result = await updateReturnedOrder(returnedOrderId, newReturnedOrderDetails);
        await res.json(result);
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function putReturnedOrderProduct(req, res) {
    try{
        const   returnedOrderId = req.params.orderId,
                returnedProductId = req.params.productId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: returnedOrderId, dataType: "string", isRequiredValue: true },
            { fieldName: "Returned Product Id", fieldValue: returnedProductId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const newReturnedOrderProductDetails = req.body;
        const { updateReturnedOrderProduct } = require("../models/returnedOrders.model");
        const result = await updateReturnedOrderProduct(returnedOrderId, returnedProductId, newReturnedOrderProductDetails);
        await res.json(result);
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function deleteReturnedOrder(req, res) {
    try{
        const returnedOrderId = req.params.orderId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: returnedOrderId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { deleteReturnedOrder } = require("../models/returnedOrders.model");
        const result = await deleteReturnedOrder(returnedOrderId);
        await res.json(result);
    }
    catch(err){
        await res.status(500).json(err);
    }
}

async function deleteProductFromReturnedOrder(req, res) {
    try{
        const   returnedOrderId = req.params.orderId,
                productId = req.params.productId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Returned Order Id", fieldValue: returnedOrderId, dataType: "string", isRequiredValue: true },
            { fieldName: "Product Id", fieldValue: productId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { deleteProductFromReturnedOrder } = require("../models/returnedOrders.model");
        const result = await deleteProductFromReturnedOrder(returnedOrderId, productId);
        await res.json(result);
    }
    catch(err){
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