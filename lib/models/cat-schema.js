const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for 'cat'
const schema = new Schema({
  breed: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Cat', schema);
