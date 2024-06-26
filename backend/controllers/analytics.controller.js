import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

// Retrieves analytics data for a specific merchant based on their ID.
export const getMerchantAnalytics = async (req, res) => {
    try {
        const orders = await Order.find({ merchantId: req.params.id });
        const products = await Product.find({ owner: req.params.id });
        const reviews = await Review.find({ merchantId: req.params.id });
        // Excludes user passwords from the results.
        const users = await User.find({ _id: req.params.id }, { password: 0 });
        return res
            .status(200)
            .json(CreateSuccess(200, "Retrieve analytics for a merchant by ID", { orders, products, reviews, users }));
    } catch (error) {
        return res
            .status(500)
            .json(CreateError(500, "Unable to retrieve analytics for a merchant by ID", error));
    }
}

// Retrieves analytics data for all merchants.
export const getAllMerchantAnalytics = async (req, res) => {
    try {
        const orders = await Order.find();
        const products = await Product.find();
        const reviews = await Review.find();
        // Excludes user passwords from the results.
        const users = await User.find({}, { password: 0 });
        return res.status(200).json(CreateSuccess(200, "Retrieve analytics for all merchants", { orders, products, reviews, users }));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to retrieve analytics for all merchants", error));
    }
}

// Retrieves sales data for all merchants aggregated by month.
export const getAllMerchantsSalesByMonth = async (req, res) => {
    console.log("getAllMerchantsSalesByMonth");
    try {
        const year = parseInt(req.params.year);
        console.log("year", year);

        // MongoDB aggregation pipeline
        const pipeline = [
            {
                // Finds all completed orders for the given year.
                $match: {
                    status: 'COMPLETED',
                    createdAt: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)
                    }
                }
            },
            {
                // Groups the orders by month and product.
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        productId: '$productId'
                    },
                    totalSales: { $sum: '$total' },
                    quantity: { $sum: '$quantity' }
                }
            },
            {
                // Groups the orders by month.
                $group: {
                    _id: '$_id.month',
                    details: {
                        $push: {
                            productId: '$_id.productId',
                            totalSales: '$totalSales',
                            quantity: '$quantity'
                        }
                    }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ];

        let monthlySales = await Order.aggregate(pipeline);

        monthlySales = monthlySales.reduce((acc, curr) => {
            const salesRanking = [...curr.details].sort((a, b) => b.quantity - a.quantity);
            const revenueRanking = [...curr.details].sort((a, b) => b.totalSales - a.totalSales);
            acc.push({
                month: curr._id,
                totalSales: curr.details.reduce((a, b) => a + b.totalSales, 0),
                count: curr.details.length,
                totalProductsSold: curr.details.reduce((a, b) => a + b.quantity, 0),
                salesRanking,
                revenueRanking
            });

            return acc;
        }, []);

        for (let i = 1; i <= 12; i++) {
            if (!monthlySales.find(ms => ms.month === i)) {
                monthlySales.push({
                    month: i,
                    totalSales: 0,
                    count: 0,
                    totalProductsSold: 0,
                    salesRanking: [],
                    revenueRanking: []
                });
            }
        }

        monthlySales.sort((a, b) => a.month - b.month);

        return res.status(200).json(CreateSuccess(200, "Sales by month for all merchants", monthlySales));
    } catch (error) {
        console.error(error);
        return res.status(500).json(CreateError(500, "Unable to retrieve sales by month for all merchants", error));
    }
};

// Retrieves sales data for a specific merchant aggregated by month.
export const getMerchantSalesByMonth = async (req, res) => {
    try {
        const year = parseInt(req.query.year);
        const merchantId = req.params.id;

        const pipeline = [
            {
                $match: {
                    merchantId: merchantId,
                    status: 'COMPLETED',
                    createdAt: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        productId: '$productId'
                    },
                    totalSales: { $sum: '$total' },
                    quantity: { $sum: '$quantity' }
                }
            },
            {
                $group: {
                    _id: '$_id.month',
                    details: {
                        $push: {
                            productId: '$_id.productId',
                            totalSales: '$totalSales',
                            quantity: '$quantity'
                        }
                    }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ];

        let monthlySales = await Order.aggregate(pipeline);

        monthlySales = monthlySales.reduce((acc, curr) => {
            const salesRanking = [...curr.details].sort((a, b) => b.quantity - a.quantity);
            const revenueRanking = [...curr.details].sort((a, b) => b.totalSales - a.totalSales);
            acc.push({
                month: curr._id,
                totalSales: curr.details.reduce((a, b) => a + b.totalSales, 0),
                count: curr.details.length,
                totalProductsSold: curr.details.reduce((a, b) => a + b.quantity, 0),
                salesRanking,
                revenueRanking
            });

            return acc;
        }, []);

        for (let i = 1; i <= 12; i++) {
            if (!monthlySales.find(ms => ms.month === i)) {
                monthlySales.push({
                    month: i,
                    totalSales: 0,
                    count: 0,
                    totalProductsSold: 0,
                    salesRanking: [],
                    revenueRanking: []
                });
            }
        }

        monthlySales.sort((a, b) => a.month - b.month);

        return res.status(200).json(CreateSuccess(200, "Sales by month for a merchant", monthlySales));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to retrieve sales for a merchant by month", error));
    }
};

// Retrieves the total transaction amount for a given merchant.
export const getTransactionTotalByMerchant = async (req, res) => {
    try {
        // Find all orders for the given merchant.
        const orders = await Order.find({ merchantId: req.params.id });
        let total = 0;
        // Add up the total of all orders.
        orders.forEach((order) => {
            total += order.total;
        });
        return res.status(200).json(CreateSuccess(200, "Retrieve total transaction amount for a merchant", total));

    } catch (error) {
        return res.status(500).json(CreateError(500, "Unable to retrieve total transaction amount for a merchant", error));
    }
}
