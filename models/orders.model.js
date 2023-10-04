// Import Mongoose And Order Model Object

const { mongoose, orderModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function getAllOrders() {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const orders = await orderModel.find({});
        await mongoose.disconnect();
        return orders;
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function postNewOrder() {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const newOrder = new orderModel({});
        const orderDetails = await newOrder.save();
        await mongoose.disconnect();
        return { msg: "Creating New Order Has Been Successfuly !!", orderId: orderDetails._id };
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function updateOrder(orderId, newOrderDetails) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const newOrderData = new orderModel.findOneAndUpdate({ _id: orderId }, { ...newOrderDetails });
        console.log(newOrderData);
        await mongoose.disconnect();
        return { msg: "Updating Order Details Has Been Successfuly !!", orderId: newOrderData };
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    getAllOrders,
    postNewOrder,
    updateOrder,
}