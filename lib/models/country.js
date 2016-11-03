const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: String,
    religions: [String],
    freedom: Boolean
});

module.exports = mongoose.model('Country', countrySchema);