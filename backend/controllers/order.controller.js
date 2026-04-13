import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

// Placing order using COD method

const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}});

        res.json({success: true, message: "Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}


// Placing order using Stripe method

const placeOrderStripe = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


// Placing order using Razorpay method

const placeOrderRazorpay = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


// All orders data for Admin panel

const allOrders = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// User orders data for frontend

const userOrders = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// update order status from Admin panel

const updateStatus = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};