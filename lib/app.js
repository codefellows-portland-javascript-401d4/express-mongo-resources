'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const heroes = require('./routes/heroes');

app.use('/heroes', heroes);

module.exports = app;