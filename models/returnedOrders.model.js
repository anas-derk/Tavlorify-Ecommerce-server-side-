// Import Returned Order Model Object

const { orderModel, returnedOrderModel } = require("../models/all.models");

const { mongoose } = require("../server");

const { calcOrderAmount } = require("../global/functions");

async function getAllReturnedOrdersInsideThePage(pageNumber, pageSize, filters) {
    try {
        return {
            msg: `Get All Returned Orders Inside The Page: ${pageNumber} Process Has Been Successfully !!`,
            error: false,
            data: await returnedOrderModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ returnedOrderNumber: -1 }),
        };
    } catch (err) {
        throw Error(err);
    }
}

async function getReturnedOrdersCount(filters) {
    try {
        return {
            msg: "Get Returned Orders Count Process Has Been Successfully !!",
            error: false,
            data: await returnedOrderModel.countDocuments(filters),
        };
    } catch (err) {
        throw Error(err);
    }
}

async function getReturnedOrderDetails(orderId) {
    try {
        const order = await returnedOrderModel.findById(orderId);
        if (order) {
            return {
                msg: "Get Returned Order Details Process Has Been Successfully !!",
                error: false,
                data: order,
            };
        }
        return {
            msg: "Sorry, This Order Is Not Found !!",
            error: true,
            data: {},
        };
    } catch (err) {
        throw Error(err);
    }
}

async function postNewReturnedOrder(orderId) {
    try {
        const orderDetails = await orderModel.findById(orderId);
        if (orderDetails) {
            const returnedOrder = await returnedOrderModel.findOne().sort({ orderNumber: -1 });
            const newReturnedOrder = new returnedOrderModel({
                returnedOrderNumber: returnedOrder ? returnedOrder.returnedOrderNumber + 1 : 1,
                orderNumber: orderDetails.orderNumber,
                orderId,
                order_amount: orderDetails.order_amount,
                customer: {
                    first_name: orderDetails.billing_address.given_name,
                    last_name: orderDetails.billing_address.family_name,
                    email: orderDetails.billing_address.email,
                    phone: orderDetails.billing_address.phone,
                },
                order_lines: orderDetails.order_lines,
            });
            await newReturnedOrder.save();
            await orderModel.updateOne({ _id: orderId }, { isReturned: true });
            return {
                msg: "Creating New Returned Order Process Has Been Successfuly !!",
                error: false,
                data: {},
            };
        }
        return {
            msg: "Sorry, This Order Is Not Found !!",
            error: true,
            data: {},
        };
    } catch (err) {
        throw Error(err);
    }
}

async function updateReturnedOrder(returnedOrderId, newReturnedOrderDetails) {
    try {
        const returnedOrder = await returnedOrderModel.findOneAndUpdate( { _id: returnedOrderId } , { ...newReturnedOrderDetails });
        if (returnedOrder) {
            return {
                msg: "Updating Returned Order Details Process Has Been Successfuly !!",
                error: false,
                data: {},
            };
        }
        return {
            msg: "Sorry, This Order Is Not Found !!",
            error: true,
            data: {},
        };
    } catch (err) {
        throw Error(err);
    }
}

async function updateReturnedOrderProduct(returnedOrderId, productId, newReturnedOrderDetails) {
    try {
        const order = await returnedOrderModel.findOne({ _id: returnedOrderId });
        if (order) {
            const productIndex = order.order_lines.findIndex((order_line) => order_line._id == productId);
            if (productIndex !== -1) {
                order.order_lines[productIndex].quantity = newReturnedOrderDetails.quantity;
                order.order_lines[productIndex].name = newReturnedOrderDetails.name;
                order.order_lines[productIndex].unit_price = newReturnedOrderDetails.unit_price;
                order.order_lines[productIndex].total_amount = newReturnedOrderDetails.total_amount;
                order.order_lines[productIndex].return_reason = newReturnedOrderDetails.return_reason;
                await returnedOrderModel.updateOne({ _id: returnedOrderId }, { order_lines: order.order_lines, order_amount: calcOrderAmount(order.order_lines) });
                return {
                    msg: "Updating Returned Order Details Process Has Been Successfuly !!",
                    error: false,
                    data: {},
                };
            }
            return {
                msg: "Sorry, This Product For This Order Is Not Found !!",
                error: true,
                data: {},
            };
        }
        return {
            msg: "Sorry, This Order Is Not Found !!",
            error: true,
            data: {},
        };
    } catch (err) {
        throw Error(err);
    }
}

async function deleteReturnedOrder(returnedOrderId){
    try{
        const returnedOrder = await returnedOrderModel.findOneAndUpdate({ _id: returnedOrderId }, { isDeleted: true });
        if (returnedOrder) {
            return {
                msg: "Deleting This Returned Order Has Been Successfuly !!",
                error: false,
                data: {},
            };
        }
        return {
            msg: "Sorry, This Order Is Not Found !!",
            error: true,
            data: {},
        };
    }
    catch(err){
        throw Error(err);
    }
}

async function deleteProductFromReturnedOrder(returnedOrderId, productId) {
    try {
        const returnedOrder = await returnedOrderModel.findOne({ _id: returnedOrderId });
        if (returnedOrder) {
            const newOrderLines = returnedOrder.order_lines.filter((order_line) => order_line._id != productId);
            if (newOrderLines.length < returnedOrder.order_lines.length) {
                await returnedOrderModel.updateOne({ _id: returnedOrderId }, { order_lines: newOrderLines });
                return {
                    msg: "Deleting Product From Returned Order Has Been Successfuly !!",
                    error: false,
                    data: {},
                };
            }
            return {
                msg: "Sorry, This Product For This Order Is Not Found !!",
                error: true,
                data: {},
            };
        }
        return {
            msg: "Sorry, This Order Is Not Found !!",
            error: true,
            data: {},
        };
    } catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllReturnedOrdersInsideThePage,
    getReturnedOrdersCount,
    getReturnedOrderDetails,
    postNewReturnedOrder,
    updateReturnedOrder,
    updateReturnedOrderProduct,
    deleteReturnedOrder,
    deleteProductFromReturnedOrder,
}