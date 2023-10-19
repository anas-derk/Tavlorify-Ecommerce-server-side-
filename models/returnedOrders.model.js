// Import Mongoose And Returned Order Model Object

const { mongoose, returnedOrderModel } = require("../models/all.models");

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

async function postNewReturnedOrder(returnedOrderDetails) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const returnedOrdersCount = await returnedOrderModel.countDocuments();
        const newReturnedOrder = new orderModel({ returnedOrderNumber: returnedOrdersCount + 1, ...returnedOrderDetails });
        await newReturnedOrder.save();
        await mongoose.disconnect();
        return "Creating New Order Has Been Successfuly !!";
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    getAllReturnedOrders,
    postNewReturnedOrder,
}