const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID,

    SearchStorySchema = new mongoose.Schema({
        query: {
            type: String,
            required: true
        },
        searchDate: {
            type: Date,
            default: Date.now
        },
        userId: {
            type: ObjectID,
            required: true
        }
    });

module.exports = mongoose.model('SearchHistroy', SearchStorySchema);
