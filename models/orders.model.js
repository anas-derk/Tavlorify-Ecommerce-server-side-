// Import Order Model Object

const { orderModel } = require("../models/all.models");

async function getAllOrdersInsideThePage(pageNumber, pageSize, filters) {
    try {
        const orders = await orderModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ orderNumber: -1 });
        return orders;
    } catch (err) {
        throw Error(err);
    }
}

async function getOrdersCount(filters) {
    try {
        const ordersCount = await orderModel.countDocuments(filters);
        return ordersCount;
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
        return { msg: "Creating New Order Has Been Successfuly !!", orderId: orderDetails._id };
    } catch (err) {
        throw Error(err);
    }
}

async function updateOrder(orderId, newOrderDetails) {
    try {
        const { orderNumber } = await orderModel.findOneAndUpdate({
            $or: [
                {
                    _id: orderId,
                },
                {
                    klarnaOrderId: newOrderDetails.klarnaOrderId,
                }
            ]
        }, { ...newOrderDetails });
        return orderNumber;
    } catch (err) {
        throw Error(err);
    }
}

async function updateOrderProduct(orderId, productId, newOrderProductDetails) {
    try {
        const { order_lines } = await orderModel.findOne({ _id: orderId });
        const productIndex = order_lines.findIndex((order_line) => order_line._id == productId);
        order_lines[productIndex].quantity = newOrderProductDetails.quantity;
        order_lines[productIndex].name = newOrderProductDetails.name;
        order_lines[productIndex].unit_price = newOrderProductDetails.unit_price;
        order_lines[productIndex].total_amount = newOrderProductDetails.total_amount;
        const { calcOrderAmount } = require("../global/functions");
        await orderModel.updateOne({ _id: orderId }, { order_lines, order_amount: calcOrderAmount(order_lines) });
        return "Updating Order Details Has Been Successfuly !!";
    } catch (err) {
        throw Error(err);
    }
}

async function deleteOrder(orderId){
    try{
        await orderModel.updateOne({ _id: orderId }, { isDeleted: true });
        return "Deleting This Order Has Been Successfuly !!";
    }
    catch(err){
        throw Error(err);
    }
}

async function deleteProductFromOrder(orderId, productId) {
    try {
        const { order_lines } = await orderModel.findOne({ _id: orderId });
        const newOrderLines = order_lines.filter((order_line) => order_line._id == productId);
        await orderModel.updateOne({ _id: orderId }, { order_lines: newOrderLines });
        return "Deleting Product From Order Has Been Successfuly !!";
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