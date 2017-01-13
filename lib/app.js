const express = require('express');
const app = express();
const Team = require('./models/team');

const errorHandler = require('./error_handler');

const teams = require('./routes/teams');
const players = require('./routes/players');


app.use('/api/teams', teams);
app.use('/api/players', players);

// non-CRUD endpoint, finds teams with no losses
app.get('/teams-with-no-losses', (req, res, next) => {
    Team.find({ 'losses': '0' }, 'teamName losses', function (err, team) {
        if (err) return (err);
        else return(team);
    })
    .then(team => res.send(team))
    .catch(next);
});

app.use(errorHandler);

module.exports = app;
