const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  teamName: {
    type: String,
    required: true
  },
  teamMembers: {
    type: Array
  },
  region: {
    type: String,
  },
  tiWinner: {
    type: Boolean,
  }
});

module.exports = mongoose.model('Team', schema);