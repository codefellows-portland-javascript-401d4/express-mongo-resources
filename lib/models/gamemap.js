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
        default: 'cubits',
        required: true
    }
});

schema.pre('save', function(next) {
    if (this.unitOfMeasure === '') this.unitOfMeasure = 'cubits';
    next();
});

module.exports = mongoose.model('GameMaps', schema);