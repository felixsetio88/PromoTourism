// Backend model definition for User using Mongoose and MongoDB.

import mongoose, { Schema } from "mongoose";

// Define the User schema with various fields and their specifications.
const UserSchema = mongoose.Schema({
    // User's email with constraints for uniqueness and maximum length.
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    // User's password with minimum length requirement.
    password: {
        type: String,
        required: true,
        min: 6
    },
    // User's address with a maximum length.
    address: {
        type: String,
        max: 80
    },
    // User's name with constraints for maximum length.
    name: {
        required: true,
        type: String,
        max: 40
    },
    // User's role, such as admin or regular user, with a maximum length.
    roles: {
        required: true,
        type: String,
        max: 40,
    },
    // User's phone number with constraints for maximum length and requirement.
    phoneNo: {
        type: String,
        max: 20,
        required: true,
    },
    // User's additional description with a maximum length.
    description: {
        type: String,
        max: 300,
    },
    // Code for resetting the password with a maximum length.
    resetPasswordCode: {
        type: String,
        max: 10,
    },
    // Account status with a maximum length and default value.
    accountStatus: {
        type: String,
        max: 10,
        default: "approved",
    },
    // Description for the user's license with a maximum length.
    licenseDescription: {
        type: String,
        max: 100,
    },
    // Description for the user's reviews with a maximum length.
    reviewsDescription: {
        type: String,
        max: 100,
    },
    // Path to the user's license file with a maximum length.
    licensePath: {
        type: String,
        max: 256,
    },
    // Path to the user's reviews file with a maximum length.
    reviewsPath: {
        type: String,
        max: 256,
    },
    // Flag indicating whether the user has reset their password.
    hasResetPassword: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Export the User model for use in the application.
export default mongoose.model("User", UserSchema);
