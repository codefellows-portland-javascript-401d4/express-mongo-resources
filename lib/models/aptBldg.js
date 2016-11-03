const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    nbrunits: Number
},
{
    // schema level settings
    // timestamps: true
});

module.exports = mongoose.model('AptBldg', schema);
