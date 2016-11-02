const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },
    game: {
        type: String,
    },
    age: {
        type: Number
    },
    attackpower: {
        type: Number
    }

    //TODO: Add additional schema options you lazy mofo

});

module.exports = mongoose.model('GameChars', schema);