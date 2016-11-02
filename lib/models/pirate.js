const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema({
	// define "shape" of model here
    name: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        default: 'crew'
    },
    swords: Number
}
, {
    // schema level options here

	// this adds createdAt and updatedAt fields to our model
	// timestamps: true
});

module.exports = mongoose.model('Pirate', schema);