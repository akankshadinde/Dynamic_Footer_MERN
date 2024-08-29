const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
    icons: [String], // or appropriate schema for icons
    phoneNumber: String,
    email: String,
    address: String,
    texts: [String], // Ensure texts is an array of strings
});

module.exports = mongoose.model('Footer', FooterSchema);
