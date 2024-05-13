import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { CreateSuccess } from '../utils/success.js';
import { CreateError } from '../utils/error.js';

// Creates a new order with user and product details, total, quantity, merchant ID, and PayPal information.

// Retrieves all orders from the database, used by admin/officer to view all orders.
export const getOrders = async (req, res) => {  
    try {
        const orders = await Order.find();
        return res.status(200).json(CreateSuccess(200, "Success", orders));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to retrieve orders", error));
    }
};

// Retrieves a specific order from the database based on the supplied ID, can be used by all users.
export const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId);
        return res.status(200).json(CreateSuccess(200, "Success", order));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to retrieve order", error));
    }
};
// Retrieves all orders from the database based on the merchant ID, used by merchants to view orders made to their products.
export const getOrderByMerchantId = async (req, res) => {
    const { merchantId } = req.params;
    try {
        const orders = await Order.find({merchantId: merchantId});
        return res.status(200).json(CreateSuccess(200, "Success", orders));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to retrieve orders", error));
    }
}
export const createOrder = async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json(CreateError('User not found'));
    const product = await Product.findById(req.body.productId);
    if(!product) return res.status(404).json(CreateError('Product not found'));

    const total = req.body.total;
    const invoiceNumber = req.body.invoice;
    const paypalInfo = req.body.paypalInfo;
    const merchantId = product.owner;
    const paymentStatus = req.body.paymentStatus;

    if(product.quantity < req.body.quantity) return res.status(404).json(CreateError(200, 'Insufficient product quantity', product.quantity));

    const newOrder = new Order({
        userId: user._id,
        productId: product._id,
        merchantId: merchantId,
        total: total,
        status: paymentStatus,
        invoiceNumber: invoiceNumber,
        paypalInfo: paypalInfo,
        quantity: req.body.quantity,
    });

    product.quantity = product.quantity - req.body.quantity;  
    product.sold = product.sold + req.body.quantity;

    try {
        const savedOrder = await newOrder.save();
        await product.save();
        return res.status(200).json(CreateSuccess(200, "Order created", savedOrder));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to create order", error))
    }
};

// Retrieves all orders from the database based on the user ID, used by users to view their past orders.
export const getOrderbyUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({userId: userId});
        return res.status(200).json(CreateSuccess(200, "Success", orders));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to retrieve orders", error));
    }
};


// Checks if a product listed in an order has been reviewed.
export const hasReviewed = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId);
        return res.status(200).json(CreateSuccess(404, "Retrieved Order Status", order.hasReview));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to retrieve order status", error));
    }
}
