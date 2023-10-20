async function getAllReturnedOrders(req, res) {
    const { getAllReturnedOrders } = require("../models/returnedOrders.model");
    try{
        const result = await getAllReturnedOrders();
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

async function getReturnedOrderDetails(req, res) {
    const orderId = req.params.orderId;
    if (!orderId) await res.status(400).json("Please Send Returned Order Id !!");
    else {
        const { getReturnedOrderDetails } = require("../models/returnedOrders.model");
        try{
            await res.json(await getReturnedOrderDetails(orderId));
        }
        catch(err){
            await res.status(500).json(err);
        }
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

module.exports = {
    getAllReturnedOrders,
    getReturnedOrderDetails,
    postNewReturnedOrder,
}