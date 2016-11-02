'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const heroes = require('./routes/heroes');
const villains = require('./routes/villains');

app.use('/heroes', heroes);
app.use('/villains', villains);

// app.use(errorHandler);

module.exports = app;