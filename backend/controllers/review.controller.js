import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

// Creates a new review for a specific product based on a given order.
export const createReview = async (req, res) => {
  const product = await Product.findOne({ _id: req.body.productId });
  if (!product)
    return res.status(404).json(CreateError(404, "Product not found"));

  const review = new Review({
    userId: req.body.userId,
    productId: req.body.productId,
    orderId: req.body.orderId,
    rating: req.body.rating,
    comment: req.body.comment,
    merchantId: product.owner,
  });

  // Finds the corresponding order.
  const order = await Order.findOne({ _id: req.body.orderId });
  if (!order) return res.status(404).json(CreateError(404, "Order not found"));

  // Changes the order status to 'reviewed'.
  order.hasReviewed = true;

  // Saves the updated order to the database.
  try {
    await order.save();
  } catch (error) {
    return res.status(500).json(CreateError(500, "Cannot update order", error));
  }

  // Saves the new review to the database.
  try {
    const savedReview = await review.save();
    return res
      .status(200)
      .json(CreateSuccess(200, "Review created", savedReview));
  } catch (error) {
    return res
      .status(500)
      .json(CreateError(500, "Cannot create review", error));
  }
};

// Retrieves all reviews based on the supplied product ID.
// Accessible to all users to view reviews for a specific product.
// Filters reviews by productId.
export const getReviewByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id });
    return res
      .status(200)
      .json(CreateSuccess(200, "Get reviews by product id", reviews));
  } catch (error) {
    return res
      .status(500)
      .json(CreateError(500, "Cannot get reviews by product id", error));
  }
};

// Retrieves a specific review based on the supplied review ID.
// Accessible to all users to view a specific review.
export const getReviewById = async (req, res) => {
  //to prevent crashing due to errors
  try {
    const review = await Review.findOne({ _id: req.params.id });
    return res.status(200).json(CreateSuccess(200, "Get review by id", review));
  } catch (error) {
    return res
      .status(500)
      .json(CreateError(500, "Cannot get review by id", error));
  }
};

// Retrieves a specific review based on the supplied order ID.
// Accessible to all users to view a specific review from a particular order.
export const getReviewByOrder = async (req, res) => {
  //to prevent from crashing due to any error
  try {
    //used to get reviews from order
    const review = await Review.findOne({ orderId: req.params.id });
    return res
      .status(200)
      .json(CreateSuccess(200, "Success", review));
  } catch (error) {
    return res
      .status(500)
      .json(CreateError(500, "Cannot get review by order id", error));
  }
};

// Retrieves the average review rating for a specific product based on the supplied product ID.
export const getReviewAverageByProduct = async (req, res) => {
  //to prevent any crash because of error
  try {
    //variables that is used to find review based on the product id
    const reviews = await Review.find({ productId: req.params.id });
    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });

    const averageRating = totalRating / reviews.length;
    return res
      .status(200)
      .json(
        CreateSuccess(200, "Get average based on product id", averageRating)
      );
  } catch (error) {
    return res
      .status(500)
      .json(CreateError(500, "Error: ", error));
  }
};

//this method is used to get the average income of the user
export const getMerchantReviewAverage = async (req, res) => {
  //try catch is used to prevent crash due to any errors
  try {
    //variables that is used to find the reviews based on the merchant id
    const reviews = await Review.find({ merchantId: req.params.id });
    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });
    const averageRating = totalRating / reviews.length;
    return res
      .status(200)
      .json(CreateSuccess(200, "Average merchant", averageRating));
  } catch (error) {
    return res
      .status(500)
      .json(CreateError(500, "retrieve failed! with error: ", error));
  }
};
