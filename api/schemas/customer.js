const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    passport: { type: String },
    name: { type: String },
    origin: { type: String },
    email: { type: String },
    password: { type: String }
});

module.exports = mongoose.model('Customer', CustomerSchema);