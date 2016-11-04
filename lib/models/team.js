const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaTeam = new Schema ({

    teamName: {
        type: String,
        required: true
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    }

});

module.exports = mongoose.model('Team', schemaTeam);
