const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    url: String
});

module.exports = mongoose.model('Site', siteSchema);