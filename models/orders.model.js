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

async function postNewOrder(orderDetails) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const order = await orderModel.findOne({ klarnaOrderId: orderDetails.order_id });
        if (order) {
            await mongoose.disconnect();
            return "This Order Is Already Exist !!";
        }
        else {
            const newOrder = new orderModel({
                klarnaOrderId: orderDetails.order_id,
                billing_address: {
                    city: orderDetails.billing_address.city,
                    email: orderDetails.billing_address.email,
                    given_name: orderDetails.billing_address.given_name,
                    family_name: orderDetails.billing_address.family_name,
                    phone: orderDetails.billing_address.phone,
                    postal_code: orderDetails.billing_address.postal_code,
                    street_address: orderDetails.billing_address.street_address,
                },
                shipping_address: {
                    city: orderDetails.shipping_address.city,
                    email: orderDetails.shipping_address.email,
                    given_name: orderDetails.shipping_address.given_name,
                    family_name: orderDetails.shipping_address.family_name,
                    phone: orderDetails.shipping_address.phone,
                    postal_code: orderDetails.shipping_address.postal_code,
                    street_address: orderDetails.shipping_address.street_address,
                },
                completed_at: orderDetails.shipping_address.completed_at,
            });
            await newOrder.save();
            await mongoose.disconnect();
            return "Adding New Order Is Successfuly !!";
        }
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error(err);
    }
}

module.exports = {
    getAllOrders,
    postNewOrder,
}