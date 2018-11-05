const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        default: 'Tom',
        required: true
    },
    color: {
        type: String,
        required: true
    },
    legs: {
        type: Number,
        max: [4],
        required: true
    }
});

module.exports = mongoose.model('Cats', schema);