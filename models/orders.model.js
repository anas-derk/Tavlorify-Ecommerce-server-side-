// Import Order Model Object

const { orderModel, returnedOrderModel } = require("../models/all.models");

const { mongoose } = require("../server");

const { calcOrderAmount } = require("../global/functions");

async function getOrdersCount(ordersType, filters) {
    try {
        return {
            msg: "Get Orders Count Process Has Been Successfully !!",
            error: false,
            data: ordersType === "normal" ? await orderModel.countDocuments(filters) : await returnedOrderModel.countDocuments(filters),
        };
    } catch (err) {
        throw Error(err);
    }
}

async function getAllOrdersInsideThePage(ordersType, pageNumber, pageSize, filters) {
    try {
        return {
            msg: `Get All Orders Inside The Page: ${pageNumber} Process Has Been Successfully !!`,
            error: false,
            data: ordersType === "normal" ? await orderModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ orderNumber: -1 }) :  await returnedOrderModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ orderNumber: -1 }),
        };
    } catch (err) {
        throw Error(err);
    }
}

async function getOrderDetails(orderType, orderId) {
    try {
        const order = orderType === "normal" ? await orderModel.findById(orderId) : await returnedOrderModel.findById(orderId);
        if (order) {
            return {
                msg: `Get ${orderType} Order Details Process Has Been Successfully !!`,
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

async function postNewOrder(ordersType, orderId) {
    try {
        if (ordersType === "returned") {
            const orderDetails = await orderModel.findById(orderId);
            if (orderDetails) {
                const returnedOrder = await returnedOrderModel.findOne().sort({ orderNumber: -1 });
                await (new returnedOrderModel({
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
                })).save();
                await orderModel.updateOne({ _id: orderId }, { isReturned: true });
                return {
                    msg: "Creating New Returned Order Process Has Been Successfuly !!",
                    error: false,
                    data: {},
                }
            }
        }
        const lastOrder = await orderModel.findOne().sort({ orderNumber: -1 });
        const { _id } = await ((new orderModel({ orderNumber: lastOrder ? lastOrder.orderNumber + 1 : 600000 }))).save();
        return {
            msg: "Creating New Order Process Has Been Successfuly !!",
            error: false,
            data: _id,
        }
    } catch (err) {
        throw Error(err);
    }
}

async function updateOrder(ordersType, orderId, newOrderDetails) {
    try {
        const order = ordersType === "normal" ? await orderModel.findOneAndUpdate({
            $or: [
                {
                    _id: orderId,
                },
                {
                    klarnaOrderId: newOrderDetails.klarnaOrderId,
                }
            ]
        }, { ...newOrderDetails }) : await returnedOrderModel.findOneAndUpdate( { _id: returnedOrderId } , { ...newReturnedOrderDetails });
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

async function updateOrderProduct(ordersType, orderId, productId, newOrderProductDetails) {
    try {
        const order = ordersType === "normal" ? await orderModel.findOne({ _id: orderId }) : await returnedOrderModel.findOne({ _id: returnedOrderId });
        if (order) {
            const productIndex = order.order_lines.findIndex((order_line) => order_line._id == productId);
            if (productIndex !== -1) {
                order.order_lines[productIndex].quantity = newOrderProductDetails.quantity;
                order.order_lines[productIndex].name = newOrderProductDetails.name;
                order.order_lines[productIndex].unit_price = newOrderProductDetails.unit_price;
                order.order_lines[productIndex].total_amount = newOrderProductDetails.total_amount;
                ordersType === "normal" ? await orderModel.updateOne({ _id: orderId }, { order_lines: order.order_lines, order_amount: calcOrderAmount(order.order_lines) }) : await returnedOrderModel.updateOne({ _id: returnedOrderId }, { order_lines: order.order_lines, order_amount: calcOrderAmount(order.order_lines) });
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

async function deleteOrder(ordersType, orderId){
    try{
        ordersType === "normal" ? await orderModel.updateOne({ _id: orderId }, { isDeleted: true }) : await returnedOrderModel.findOneAndUpdate({ _id: returnedOrderId }, { isDeleted: true });
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

async function deleteProductFromOrder(ordersType, orderId, productId) {
    try {
        const order = ordersType === "normal" ? await orderModel.findOne({ _id: orderId }) : await returnedOrderModel.findOne({ _id: returnedOrderId });
        if (order) {
            const newOrderLines = order.order_lines.filter((order_line) => !(new mongoose.Types.ObjectId(productId)).equals(order_line._id));
            if (newOrderLines.length < order.order_lines.length) {
                ordersType === "normal" ? await orderModel.updateOne({ _id: orderId }, { order_lines: newOrderLines }) : await returnedOrderModel.updateOne({ _id: returnedOrderId }, { order_lines: newOrderLines });
                return {
                    msg: "Deleting Product From Order Process Has Been Successfuly !!",
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
    getAllOrdersInsideThePage,
    getOrdersCount,
    getOrderDetails,
    postNewOrder,
    updateOrder,
    updateOrderProduct,
    deleteOrder,
    deleteProductFromOrder,
}