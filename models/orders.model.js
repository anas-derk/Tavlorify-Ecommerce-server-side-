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

async function updateOrderProduct(orderId, productId, newOrderProductDetails) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const { order_lines } = await orderModel.findOne({ _id: orderId });
        const productIndex = order_lines.findIndex((order_line) => order_line._id == productId);
        order_lines[productIndex].quantity = newOrderProductDetails.quantity;
        order_lines[productIndex].name = newOrderProductDetails.name;
        order_lines[productIndex].unit_price = newOrderProductDetails.unit_price;
        order_lines[productIndex].total_amount = newOrderProductDetails.total_amount;
        await orderModel.updateOne({ _id: orderId }, { order_lines });
        await mongoose.disconnect();
        return "Updating Order Details Has Been Successfuly !!";
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function deleteOrder(orderId){
    try{
        await mongoose.connect(process.env.DB_URL);
        await orderModel.deleteOne({ _id: orderId });
        return "Deleting This Order Has Been Successfuly !!";
    }
    catch(err){
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function deleteProductFromOrder(orderId, productId) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const { order_lines } = await orderModel.findOne({ _id: orderId });
        const newOrderLines = order_lines.filter((order_line) => order_line._id == productId);
        await orderModel.updateOne({ _id: orderId }, { order_lines: newOrderLines });
        await mongoose.disconnect();
        return "Deleting Product From Order Has Been Successfuly !!";
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
    updateOrderProduct,
    deleteOrder,
    deleteProductFromOrder,
}