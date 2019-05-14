const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    site: mongoose.Schema.Types.ObjectId,
    request: {
        host: String
    },
    response: {
        statusCode: Number,
        headers: Object
    },
    createdAt: Date
});

module.exports = mongoose.model('Activity', activitySchema);