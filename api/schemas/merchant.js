const mongoose = require('mongoose');

const MerchantSchema = mongoose.Schema({
    description: { type: String },
    name: { type: String },
    contactNumber: { type: String },
    email: { type: String },
    password: { type: String }

});

module.exports = mongoose.model('Merchant', MerchantSchema);