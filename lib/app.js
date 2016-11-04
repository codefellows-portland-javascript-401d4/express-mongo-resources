'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error-handler');

const artists = require('./routes/artists');
const works = require('./routes/works');

app.use('/artists');
app.use('/works');

app.use(errorHandler);

module.exports = app;
