const { getResponseObject, sendPaymentConfirmationMessage } = require("../global/functions");

const { get, post } = require("axios");

const ordersManagmentFunctions = require("../models/orders.model");

const { v4 } = require("uuid");

function getDateFormated(date) {
    let generateDateInDateFormat = new Date(date);
    return `${generateDateInDateFormat.getFullYear()} / ${generateDateInDateFormat.getMonth() + 1} / ${generateDateInDateFormat.getDate()}`;
}

function getFiltersObject(filters) {
    let filtersObject = {};
    for (let objectKey in filters) {
        if (objectKey === "orderNumber") filtersObject[objectKey] = Number(filters[objectKey]);
        if (objectKey === "_id") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "klarnaReference" && filters["ordersType"] === "normal") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "status" && filters["ordersType"] === "normal") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "customerName") filters["ordersType"] === "normal" ? filtersObject[`billing_address.given_name`] = filters[objectKey] : filtersObject[`customer.first_name`] = filters[objectKey];
        if (objectKey === "email") filters["ordersType"] === "normal" ? filtersObject[`billing_address.email`] = filters[objectKey] : filtersObject[`customer.email`] = filters[objectKey];
    }
    return filtersObject;
}

async function getOrdersCount(req, res) {
    try{
        res.json(await ordersManagmentFunctions.getOrdersCount(req.query.ordersType, getFiltersObject(req.query)));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getAllOrdersInsideThePage(req, res) {
    try{
        const filters = req.query;
        res.json(await ordersManagmentFunctions.getAllOrdersInsideThePage(req.query.ordersType, filters.pageNumber, filters.pageSize, getFiltersObject(filters)));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getOrderDetails(req, res) {
    try{
        res.json(await ordersManagmentFunctions.getOrderDetails(req.query.orderType, req.params.orderId));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getOrderDetailsFromKlarnaInCheckoutPeriod(req, res) {
    try{
        res.json((await get(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders/${req.params.orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
            },
        })).data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewOrderToGelato(req, res) {
    try {
        res.json((await post(`${process.env.GELATO_BASE_API_URL}/v4/orders`, req.body, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.GELATO_API_KEY,
            }
        })).data);
    } catch (err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewOrderToKlarna(req, res) {
    try {
        res.json({
            msg: "Creating New Order In Klarna Process Has Been Successfully !!",
            error: false,
            data: (await post(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders`, req.body, {
                headers: {
                    "Content-Type": "application/json",
                    "Klarna-Partner": "string",
                    "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString("base64")}`
                },
            })).data
        });
    }
    catch (err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewOrder(req, res) {
    try{
        res.json(await ordersManagmentFunctions.postNewOrder(req.query.ordersType, req.body));
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postKlarnaCheckoutComplete(req, res) {
    try{
        const orderId = req.params.orderId;
        let response = await get(`${process.env.KLARNA_BASE_API_URL}/ordermanagement/v1/orders/${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString("base64")}`
            },
        });
        let result = response.data;
        // ----------------------------------------------
        if (result.status == "AUTHORIZED" || result.status == "CAPTURED" || result.status === "EXPIRED") {
            const order_lines_after_modify_unit_price_and_total_amount = result.order_lines.map((order_line) => {
                return { ...order_line, unit_price: order_line.unit_price / 100, total_amount: order_line.total_amount / 100 };
            });
            const result1 = await ordersManagmentFunctions.updateOrder("normal", undefined, {
                klarnaOrderId: orderId,
                klarnaReference: result.klarna_reference,
                checkout_status: result.status,
                order_amount: result.order_amount / 100,
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
                order_lines: order_lines_after_modify_unit_price_and_total_amount,
            });
            if (!result1.error) {
                response = await post(`${process.env.KLARNA_BASE_API_URL}/ordermanagement/v1/orders/${orderId}/acknowledge`, undefined , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`,
                        "Klarna-Idempotency-Key": v4(),
                    },
                });
                await sendPaymentConfirmationMessage(result.billing_address.email, {
                    orderNumber: result1.data,
                    ...result,
                    created_at: getDateFormated(result.created_at)
                });
            }
            res.json(result1);
        } else {
            res.status(400).json(getResponseObject("checkout_incomplete", true, {}));
        }
    }
    catch(err){
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putKlarnaOrder(req, res) {
    try{
        res.json({
            msg: "Updating Klarna Order Process Has Been Successfully !!",
            error: false,
            data: (await post(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders/${req.params.orderId}`, req.body, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
                },
            })).data
        });
    }
    catch(err) {
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putOrder(req, res) {
    try{
        res.json(await ordersManagmentFunctions.updateOrder(req.query.orderType, req.params.orderId, req.body));
    }
    catch(err){
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putOrderProduct(req, res) {
    try{
        const { orderId, productId } = req.params;
        res.json(await ordersManagmentFunctions.updateOrderProduct(req.query.ordersType, orderId, productId, req.body));
    }
    catch(err){
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteOrder(req, res) {
    try{
        res.json(await ordersManagmentFunctions.deleteOrder(req.query.ordersType, req.params.orderId));
    }
    catch(err){
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteProductFromOrder(req, res) {
    try{
        const { orderId, productId } = req.params;
        res.json(await ordersManagmentFunctions.deleteProductFromOrder(req.query.ordersType, orderId, productId));
    }
    catch(err){
        res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

module.exports = {
    getAllOrdersInsideThePage,
    getOrdersCount,
    getOrderDetails,
    getOrderDetailsFromKlarnaInCheckoutPeriod,
    postNewOrderToGelato,
    postNewOrderToKlarna,
    postNewOrder,
    postKlarnaCheckoutComplete,
    putKlarnaOrder,
    putOrder,
    putOrderProduct,
    deleteOrder,
    deleteProductFromOrder,
}