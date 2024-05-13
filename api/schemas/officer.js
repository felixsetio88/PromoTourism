const mongoose = require('mongoose');

const OfficerSchema = mongoose.Schema({
    username: { type: String },
    password: { type: String }
});

module.exports = mongoose.model('Officer', OfficerSchema);