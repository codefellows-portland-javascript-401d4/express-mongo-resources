const express = require('express');
const app = express();
const morgan = require('morgan');
const log = morgan('dev');
const errorHandler = require('./error-handler');
const gamechars = require('./routes/gamechars');
const gamemaps = require('./routes/gamemaps');

app.use(log);

app.set('view engine', 'pug');

app.use('/gamechars', gamechars);

app.use('/gamemaps', gamemaps);

app.use(errorHandler);

module.exports = app;