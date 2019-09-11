const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID,

LikeSchema = new mongoose.Schema({
    photoId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: ObjectID,
        required: true
    }
});

module.exports = mongoose.model('Like', LikeSchema);
