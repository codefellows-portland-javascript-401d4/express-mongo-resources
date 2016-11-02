'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    ability: String,
    universe: String,
    created: String,
});

module.exports = mongoose.model('Villain', schema);