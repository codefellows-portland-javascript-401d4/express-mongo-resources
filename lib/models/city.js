const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        default: 'Parts Unknown'
    },
    population: Number
});

module.exports = mongoose.model('City', citySchema);