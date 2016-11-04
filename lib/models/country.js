const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// function validator(val) {
//     if (typeof val === Object && val.length) {
//         return true;
//     } else {
//         return false;
//     }
// }

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    religions: {
        type: [String],
        // validate: validator
    },
    freedom: Boolean,
    
});

module.exports = mongoose.model('Country', countrySchema);