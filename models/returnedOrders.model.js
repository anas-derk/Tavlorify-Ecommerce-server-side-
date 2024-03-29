// Import Returned Order Model Object

const { orderModel, returnedOrderModel } = require("../models/all.models");

async function getAllReturnedOrdersInsideThePage(pageNumber, pageSize, filters) {
    try {
        const orders = await returnedOrderModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ returnedOrderNumber: -1 });
        return orders;
    } catch (err) {
        throw Error(err);
    }
}

async function getReturnedOrdersCount(filters) {
    try {
        const ordersCount = await returnedOrderModel.countDocuments(filters);
        return ordersCount;
    } catch (err) {
        throw Error(err);
    }
}

async function getReturnedOrderDetails(orderId) {
    try {
        const order = await returnedOrderModel.findById(orderId);
        return order;
    } catch (err) {
        throw Error(err);
    }
}

async function postNewReturnedOrder(orderId) {
    try {
        const orderDetails = await orderModel.findById(orderId);
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
        return "Creating New Returned Order Has Been Successfuly !!";
    } catch (err) {
        throw Error(err);
    }
}

async function updateReturnedOrder(returnedOrderId, newReturnedOrderDetails) {
    try {
        await returnedOrderModel.updateOne( { _id: returnedOrderId } , { ...newReturnedOrderDetails });
        return "Updating Returned Order Details Has Been Successfuly !!";
    } catch (err) {
        throw Error(err);
    }
}

async function updateReturnedOrderProduct(returnedOrderId, productId, newReturnedOrderDetails) {
    try {
        const { order_lines } = await returnedOrderModel.findOne({ _id: returnedOrderId });
        const productIndex = order_lines.findIndex((order_line) => order_line._id == productId);
        order_lines[productIndex].quantity = newReturnedOrderDetails.quantity;
        order_lines[productIndex].name = newReturnedOrderDetails.name;
        order_lines[productIndex].unit_price = newReturnedOrderDetails.unit_price;
        order_lines[productIndex].total_amount = newReturnedOrderDetails.total_amount;
        order_lines[productIndex].return_reason = newReturnedOrderDetails.return_reason;
        const { calcOrderAmount } = require("../global/functions");
        await returnedOrderModel.updateOne({ _id: returnedOrderId }, { order_lines, order_amount: calcOrderAmount(order_lines) });
        return "Updating Returned Order Details Has Been Successfuly !!";
    } catch (err) {
        throw Error(err);
    }
}

async function deleteReturnedOrder(returnedOrderId){
    try{
        await returnedOrderModel.updateOne({ _id: returnedOrderId }, { isDeleted: true });
        return "Deleting This Returned Order Has Been Successfuly !!";
    }
    catch(err){
        throw Error(err);
    }
}

async function deleteProductFromReturnedOrder(returnedOrderId, productId) {
    try {
        // Connect To DB
        const { order_lines } = await returnedOrderModel.findOne({ _id: returnedOrderId });
        const newOrderLines = order_lines.filter((order_line) => order_line._id == productId);
        await returnedOrderModel.updateOne({ _id: returnedOrderId }, { order_lines: newOrderLines });
        return "Deleting Product From Returned Order Has Been Successfuly !!";
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