// This defines the Review model using the Mongoose library for MongoDB.

import mongoose from 'mongoose';

// Schema definition for the Review model, including various fields and their specifications.
const reviewSchema = mongoose.Schema({
    // User ID associated with the review, referencing the 'User' model.
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // Product ID associated with the review, referencing the 'Product' model.
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    // Order ID associated with the review, referencing the 'Order' model.
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order',
    },
    // Numeric rating given in the review, required for submission.
    rating: {
        type: Number,
        required: true,
    },
    // Textual comment provided in the review.
    comment: {
        type: String,
    },
    // Merchant ID associated with the review, referencing the 'Merchant' model.
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Merchant',
    },
}, {
    // Include timestamps for tracking creation and modification times.
    timestamps: true,
});

// Export the Review model for use in the application.
export default mongoose.model('Review', reviewSchema);
