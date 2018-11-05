const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String, 
        default: 'Pigeon',
        required: true
    },
    wingspan: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Birbs', schema);