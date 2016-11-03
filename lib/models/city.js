const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    population: Number,
    founding: Date
});

module.exports = mongoose.model('City', citySchema);