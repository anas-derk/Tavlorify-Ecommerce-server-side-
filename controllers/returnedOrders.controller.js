async function getAllReturnedOrders(req, res) {
    try{
        const { getAllReturnedOrders } = require("../models/returnedOrders.model");
        const result = await getAllReturnedOrders();
        await res.json(result);
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
        const returnedOrderId = req.params.returnedOrderId;
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
        if (!orderId || !productId) await res.status(400).json("Please Send Returned Order Id And Product Id !!");
        else {
            const { deleteProductFromReturnedOrder } = require("../models/returnedOrders.model");
            const result = await deleteProductFromReturnedOrder(returnedOrderId, productId);
            await res.json(result);
        }
    }
    catch(err){
        await res.status(500).json(err);
    }
}

module.exports = {
    getAllReturnedOrders,
    getReturnedOrderDetails,
    postNewReturnedOrder,
    putReturnedOrder,
    deleteReturnedOrder,
    deleteProductFromReturnedOrder,
}