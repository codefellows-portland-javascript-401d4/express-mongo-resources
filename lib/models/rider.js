const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  team: {
    type: String,
  },
  role: {
    type: String,
    default: 'domestique'
  }
}
, {
  // schema level options here
});

module.exports = mongoose.model('Rider', schema);