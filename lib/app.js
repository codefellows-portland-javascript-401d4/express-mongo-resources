const express = require('express');
const app = express();

const errorHandler = require('./error_handler');

const teams = require('./routes/teams');


app.use('/api/teams', teams);

app.use(errorHandler);

module.exports = app;
