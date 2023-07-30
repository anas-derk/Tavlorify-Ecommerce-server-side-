async function getAllOrders(req, res) {
    const { getAllOrders } = require("../models/orders.model");
    getAllOrders().then((result) => {
        res.json(result);
    })
        .catch((err) => res.json(err));
}

async function getAllOrdersForUser(req, res) {
    const userId = req.params.userId;
    if( !userId ) res.status(500).json("Sorry, Please Send User Id !!");
    else {
        const { getAllOrdersForUser } = require("../models/orders.model");
        getAllOrdersForUser().then((result) => {
            res.json(result);
        })
            .catch((err) => res.json(err));
    }
}

async function postNewOrderToGelato(req, res) {
    const GELATO_BASE_API_URL = "https://order.gelatoapis.com";
    const GELATO_API_KEY = "4ed3eafd-b375-4c9c-bcb9-e998af3f7444-45075504-d3a7-4605-9ebb-a63a590096f1:ab1d5850-26a0-4d76-8738-bbefcc109f8f";
    const axios = require("axios");
    try {
        const response = await axios.post(`${GELATO_BASE_API_URL}/v4/orders`, req.body, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": GELATO_API_KEY,
            }
        });
        const result = await response.data;
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error !");
    }
}

module.exports = {
    getAllOrders,
    getAllOrdersForUser,
    postNewOrderToGelato,
}