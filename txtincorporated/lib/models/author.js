const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  centuries: [{
    type: String,
    required: true
  }],
  altname: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Author', schema);