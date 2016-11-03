const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const players = require('./routes/players');

app.use(morgan('dev'));

app.use('/api/players', players);

app.use(errorHandler);

module.exports = app;