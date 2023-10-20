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

async function postNewReturnedOrder(req, res) {
    try{
        const { postNewReturnedOrder } = require("../models/returnedOrders.model");
        const result = await postNewReturnedOrder(req.body);
        await res.json(result);
    }
    catch(err) {
        await res.status(500).json(err);
    }
}

module.exports = {
    getAllReturnedOrders,
    postNewReturnedOrder,
}