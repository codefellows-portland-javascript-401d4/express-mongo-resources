const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },
    environment: {
        type: String,
        required: true
    },
    size: {
        type: Number,
    },
    unitOfMeasure:{
         type: String,
         default: 'cubits'
    }
});

module.exports = mongoose.model('GameMaps', schema);