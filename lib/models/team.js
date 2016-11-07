const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const team = new Schema({
    name: {
        type: String,
        required: true
    },
    conference: {
        type: String,

    },
    wins: Number
    }
    , {

})

module.exports = mongoose.model('Team', team);