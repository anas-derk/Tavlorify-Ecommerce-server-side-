// Import Order Model Object

const { orderModel } = require("../models/all.models");

async function getAllOrdersInsideThePage(pageNumber, pageSize, filters) {
    try {
        return await orderModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ orderNumber: -1 });
    } catch (err) {
        throw Error(err);
    }
}

async function getOrdersCount(filters) {
    try {
        return await orderModel.countDocuments(filters);
    } catch (err) {
        throw Error(err);
    }
}

async function getOrderDetails(orderId) {
    try {
        const order = await orderModel.findById(orderId);
        return order;
    } catch (err) {
        throw Error(err);
    }
}

async function postNewOrder() {
    try {
        const lastOrder = await orderModel.findOne().sort({ orderNumber: -1 });
        const newOrder = new orderModel({ orderNumber: lastOrder ? lastOrder.orderNumber + 1 : 600000 });
        const orderDetails = await newOrder.save();
        return {
            msg: "Creating New Order Process Has Been Successfuly !!",
            error: false,
            data: orderDetails._id,
        };
    } catch (err) {
        throw Error(err);
    }
}

async function updateOrder(orderId, newOrderDetails) {
    try {
        const order = await orderModel.findOneAndUpdate({
            $or: [
                {
                    _id: orderId,
                },
                {
                    klarnaOrderId: newOrderDetails.klarnaOrderId,
                }
            ]
        }, { ...newOrderDetails });
        if (order) {
            return {
                msg: "Updating Order Process Has Been Successfully !!",
                error: false,
                data: order.orderNumber,
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

async function updateOrderProduct(orderId, productId, newOrderProductDetails) {
    try {
        const order = await orderModel.findOne({ _id: orderId });
        if (order) {
            const productIndex = order.order_lines.findIndex((order_line) => order_line._id == productId);
            if (productIndex !== -1) {
                order.order_lines[productIndex].quantity = newOrderProductDetails.quantity;
                order.order_lines[productIndex].name = newOrderProductDetails.name;
                order.order_lines[productIndex].unit_price = newOrderProductDetails.unit_price;
                order.order_lines[productIndex].total_amount = newOrderProductDetails.total_amount;
                const { calcOrderAmount } = require("../global/functions");
                await orderModel.updateOne({ _id: orderId }, { order_lines, order_amount: calcOrderAmount(order_lines) });
                return {
                    msg: "Updating Order Details Has Been Successfuly !!",
                    error: false,
                    data: {},
                };
            }
            return {
                msg: "Sorry, This Product For This Product Is Not Found !!",
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

async function deleteOrder(orderId){
    try{
        await orderModel.updateOne({ _id: orderId }, { isDeleted: true });
        return {
            msg: "Deleting This Order Process Has Been Successfuly !!",
            error: false,
            data: {},
        };
    }
    catch(err){
        throw Error(err);
    }
}

async function deleteProductFromOrder(orderId, productId) {
    try {
        const order = await orderModel.findOne({ _id: orderId });
        if (order) {
            const newOrderLines = order.order_lines.filter((order_line) => order_line._id == productId);
            if (newOrderLines.length < order.order_lines) {
                await orderModel.updateOne({ _id: orderId }, { order_lines: newOrderLines });
                return {
                    msg: "Deleting Product From Order Process Has Been Successfuly !!",
                    error: false,
                    data: {},
                };
            }
            return {
                msg: "Sorry, This Product For This Product Is Not Found !!",
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
    getAllOrdersInsideThePage,
    getOrdersCount,
    getOrderDetails,
    postNewOrder,
    updateOrder,
    updateOrderProduct,
    deleteOrder,
    deleteProductFromOrder,
}