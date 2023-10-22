// Import Mongoose And Returned Order Model Object

const { mongoose, orderModel, returnedOrderModel } = require("../models/all.models");

async function getAllReturnedOrders() {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const orders = await returnedOrderModel.find({}).sort({ added_date: -1 });
        await mongoose.disconnect();
        return orders;
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function getReturnedOrderDetails(orderId) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const order = await returnedOrderModel.findById(orderId);
        await mongoose.disconnect();
        return order;
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

async function postNewReturnedOrder(orderId) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const orderDetails = await orderModel.findById(orderId);
        const returnedOrdersCount = await returnedOrderModel.countDocuments();
        const newReturnedOrder = new returnedOrderModel({
            returnedOrderNumber: returnedOrdersCount + 1,
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
        await mongoose.disconnect();
        return "Creating New Returned Order Has Been Successfuly !!";
    } catch (err) {
        console.log(err);
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    getAllReturnedOrders,
    getReturnedOrderDetails,
    postNewReturnedOrder,
}