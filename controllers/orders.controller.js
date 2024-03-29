const { getResponseObject, checkIsExistValueForFieldsAndDataTypes, sendPaymentConfirmationMessage } = require("../global/functions");

async function getAllOrdersInsideThePage(req, res) {
    try{
        const filters = req.query;
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Page Number", fieldValue: Number(filters.pageNumber), dataType: "number", isRequiredValue: true },
            { fieldName: "Page Size", fieldValue: Number(filters.pageSize), dataType: "number", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { getAllOrdersInsideThePage } = require("../models/orders.model");
        await res.json(await getAllOrdersInsideThePage(filters.pageNumber, filters.pageSize, getFiltersObject(filters)));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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

async function getOrdersCount(req, res) {
    try{
        const filters = req.query;
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
                objectKey !== "klarnaReference" &&
                objectKey !== "status" &&
                objectKey !== "customerName" &&
                objectKey !== "email"
            ) { await res.status(400).json("Invalid Request, Please Send Valid Keys !!"); return; }
        }
        const { getOrdersCount } = require("../models/orders.model");
        await res.json(await getOrdersCount(getFiltersObject(filters)));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getOrderDetails(req, res) {
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
        const { getOrderDetails } = require("../models/orders.model");
        await res.json(await getOrderDetails(orderId));
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function getOrderDetailsFromKlarnaInCheckoutPeriod(req, res) {
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
        const { get } = require("axios");
        const response = await get(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders/${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
            },
        });
        await res.json(await response.data);
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewOrderToGelato(req, res) {
    try {
        const axios = require("axios");
        const response = await axios.post(`${process.env.GELATO_BASE_API_URL}/v4/orders`, req.body, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.GELATO_API_KEY,
            }
        });
        await res.json(await response.data);
    } catch (err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewOrderToKlarna(req, res) {
    try {
        const orderDetails = req.body;
        const { post } = require("axios");
        const response = await post(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders`, orderDetails, {
            headers: {
                "Content-Type": "application/json",
                "Klarna-Partner": "string",
                "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
            },
        });
        await res.json(await response.data);
    }
    catch (err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postNewOrder(req, res) {
    try{
        const { postNewOrder } = require("../models/orders.model");
        await res.json(await postNewOrder());
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function postKlarnaCheckoutComplete(req, res) {
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
        const { get, post } = require("axios");
        let response = await get(`${process.env.KLARNA_BASE_API_URL}/ordermanagement/v1/orders/${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
            },
        });
        let result = await response.data;
        // ----------------------------------------------
        if (result.status == "AUTHORIZED" || result.status == "CAPTURED") {
            const { updateOrder } = require("../models/orders.model");
            const order_lines_after_modify_unit_price_and_total_amount = result.order_lines.map((order_line) => {
                return { ...order_line, unit_price: order_line.unit_price / 100, total_amount: order_line.total_amount / 100 };
            });
            const result1 = await updateOrder(undefined, {
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
                const { v4 } = require("uuid");
                response = await post(`${process.env.KLARNA_BASE_API_URL}/ordermanagement/v1/orders/${orderId}/acknowledge`, undefined , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`,
                        "Klarna-Idempotency-Key": v4(),
                    },
                });
                await sendPaymentConfirmationMessage(result.shipping_address.email, {
                    orderNumber: result1.data,
                    ...result,
                });
            }
            await res.json(result1);
        } else {
            await res.status(400).json(getResponseObject("checkout_incomplete", true, {}));
        }
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putKlarnaOrder(req, res) {
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
        const newOrderDetails = req.body;
        const { post } = require("axios");
        const response = await post(`${process.env.KLARNA_BASE_API_URL}/checkout/v3/orders/${orderId}`, newOrderDetails, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${process.env.KLARNA_API_USER_NAME}:${process.env.KLARNA_API_PASSWORD}`).toString('base64')}`
            },
        });
        await res.json(await response.data);
    }
    catch(err) {
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putOrder(req, res) {
    try{
        const orderId = req.params.orderId;
        const newOrderDetails = req.body;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: orderId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { updateOrder } = require("../models/orders.model");
        await res.json(await updateOrder(orderId, newOrderDetails));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function putOrderProduct(req, res) {
    try{
        const   orderId = req.params.orderId,
                productId = req.params.productId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: orderId, dataType: "string", isRequiredValue: true },
            { fieldName: "Product Id", fieldValue: productId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const newOrderProductDetails = req.body;
        const { updateOrderProduct } = require("../models/orders.model");
        await res.json(await updateOrderProduct(orderId, productId, newOrderProductDetails));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteOrder(req, res) {
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
        const { deleteOrder } = require("../models/orders.model");
        await res.json(await deleteOrder(orderId));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
    }
}

async function deleteProductFromOrder(req, res) {
    try{
        const   orderId = req.params.orderId,
                productId = req.params.productId;
        const { checkIsExistValueForFieldsAndDataTypes } = require("../global/functions");
        const checkResult = checkIsExistValueForFieldsAndDataTypes([
            { fieldName: "Order Id", fieldValue: orderId, dataType: "string", isRequiredValue: true },
            { fieldName: "Product Id", fieldValue: productId, dataType: "string", isRequiredValue: true },
        ]);
        if (checkResult) {
            await res.status(400).json(checkResult);
            return;
        }
        const { deleteProductFromOrder } = require("../models/orders.model");
        await res.json(await deleteProductFromOrder(orderId, productId));
    }
    catch(err){
        await res.status(500).json(getResponseObject("Internal Server Error !!", true, {}));
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