// Import Mongoose And Order Model Object

const { mongoose, orderModel } = require("../models/all.models");

async function getAllOrders() {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const orders = await orderModel.find({}).sort({ added_date: -1 });
        await mongoose.disconnect();
        return orders;
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function getOrderDetails(orderId) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const order = await orderModel.findById(orderId);
        await mongoose.disconnect();
        return order;
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function postNewOrder() {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const ordersCount = await orderModel.countDocuments();
        const newOrder = new orderModel({ orderNumber: ordersCount + 1 });
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
        await mongoose.connect(process.env.DB_URL);
        await orderModel.updateOne({
            $or: [
                {
                    _id: orderId,
                },
                {
                    klarnaOrderId: newOrderDetails.klarnaOrderId,
                }
            ]
        }, { ...newOrderDetails });
        await mongoose.disconnect();
        return "Updating Order Details Has Been Successfuly !!";
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function updateOrder(orderId, newOrderDetails) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        await orderModel.updateOne({
            $or: [
                {
                    _id: orderId,
                },
                {
                    klarnaOrderId: newOrderDetails.klarnaOrderId,
                }
            ]
        }, { ...newOrderDetails });
        await mongoose.disconnect();
        return "Updating Order Details Has Been Successfuly !!";
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    getAllOrders,
    getOrderDetails,
    postNewOrder,
    updateOrder,
}