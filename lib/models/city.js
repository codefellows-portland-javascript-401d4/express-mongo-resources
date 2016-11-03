const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    region: String,
    population: Number
});

module.exports = mongoose.model('City', citySchema);