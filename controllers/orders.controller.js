async function getAllOrders(req, res) {
    const { getAllOrders } = require("../models/orders.model");
    getAllOrders().then((result) => {
        res.json(result);
    })
        .catch((err) => res.json(err));
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

async function postNewOrderToKlarna(req, res) {
    const orderDetails = req.body;
    const { post } = require("axios");
    try {
        const response = await post(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders`, orderDetails, {
            headers: {
                "Content-Type": "application/json",
                "Klarna-Partner": "string",
                "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
            },
        });
        const result = await response.data;
        res.json(result);
    }
    catch (err) {
        console.log(err.response.data.error_messages);
        res.status(500).json(err);
    }
}

async function postNewOrder(req, res) {
    try{
        const { postNewOrder } = require("../models/orders.model");
        const result = await postNewOrder();
        res.json(result);
    }
    catch(err) {
        res.status(500).json(err);
    }
}

async function postKlarnaCheckoutComplete(req, res) {
    try{
        const orderId = req.params.orderId;
        if (!orderId) res.status(400).json("Please Send Order Id !!");
        else {
            const { get, post } = require("axios");
            let response = await get(`${process.env.KLARNA_BASE_API_URL}/ordermanagement/v1/orders/${orderId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
                },
            });
            let result = await response.data;
            // ----------------------------------------------
            if (result.status == "AUTHORIZED") {
                const { updateOrder } = require("../models/orders.model");
                result = await updateOrder(undefined, {
                    klarnaOrderId: orderId,
                    checkout_status: result.status,
                    billing_address: {
                        city: result.billing_address.city,
                        email: result.billing_address.email || "none",
                        given_name: result.billing_address.given_name || "none",
                        family_name: result.billing_address.family_name || "none",
                        phone: result.billing_address.phone || "none",
                        postal_code: result.billing_address.postal_code || "none",
                        street_address: result.billing_address.street_address || "none",
                    },
                    shipping_address: {
                        city: result.shipping_address.city || "none",
                        email: result.shipping_address.email || "none",
                        given_name: result.shipping_address.given_name || "none",
                        family_name: result.shipping_address.family_name || "none",
                        phone: result.shipping_address.phone || "none",
                        postal_code: result.shipping_address.postal_code || "none",
                        street_address: result.shipping_address.street_address || "none",
                    },
                });
                const { v4 } = require("uuid");
                response = await post(`${process.env.KLARNA_BASE_API_URL}/ordermanagement/v1/orders/${orderId}/acknowledge`, undefined , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`,
                        "Klarna-Idempotency-Key": v4(),
                    },
                });
                await response.status;
                res.json(result);
            } else {
                res.status(500).json("checkout_incomplete");
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

async function getOrderDetailsFromKlarnaInCheckoutPeriod(req, res) {
    const orderId = req.params.orderId;
    if (!orderId) res.status(400).json("Please Send Order Id !!");
    else {
        const { get } = require("axios");
        try{
            const response = await get(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders/${orderId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
                },
            });
            const result = await response.data;
            res.json(result);
        }
        catch(err) {
            res.status(500).json(err.response.data);
        }
    }
}

async function putKlarnaOrder(req, res) {
    const orderId = req.params.orderId;
    const newOrderDetails = req.body;
    if (!orderId) res.status(400).json("Please Send Order Id !!");
    else {
        const { post } = require("axios");
        try{
            const response = await post(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders/${orderId}`, newOrderDetails, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
                },
            });
            const result = await response.data;
            res.json(result);
        }
        catch(err) {
            console.log(err.response.data);
            res.status(500).json(err);
        }
    }
}

async function putOrder(req, res) {
    const orderId = req.params.orderId;
    const newOrderDetails = req.body;
    if (!orderId) res.status(400).json("Please Send Order Id !!");
    else {
        try{
            const { updateOrder } = require("../models/orders.model");
            const result = await updateOrder(orderId, newOrderDetails);
            res.json(result);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

module.exports = {
    getAllOrders,
    getOrderDetailsFromKlarnaInCheckoutPeriod,
    postNewOrderToGelato,
    postNewOrderToKlarna,
    postNewOrder,
    postKlarnaCheckoutComplete,
    putKlarnaOrder,
    putOrder,
}