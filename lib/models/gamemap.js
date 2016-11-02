const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },
    enviroment: {
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