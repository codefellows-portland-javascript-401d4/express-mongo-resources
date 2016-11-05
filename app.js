const express = require('express');
const app = express();
const errorHandler = require('./error-handler')
const morgan = require('morgan');

const teams = require('./routes/teams');

app.use(morgan('dev'));

app.use('/api/teams', teams);

app.use(errorHandler);

module.exports = app;