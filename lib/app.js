const express = require('express');
const app = express();
const Team = require('./models/team');

const errorHandler = require('./error_handler');

const teams = require('./routes/teams');
const players = require('./routes/players');


app.use('/api/teams', teams);
app.use('/api/players', players);

// started working on non-CRUD endpoint, but didn't finish. Will have to revisit
app.get('/teams/win_percentage', (req, res, next) => {
    const query = [];
    Team.find(query)
        .then(query => res.send(query))
        .catch(next);
});

app.use(errorHandler);

module.exports = app;
