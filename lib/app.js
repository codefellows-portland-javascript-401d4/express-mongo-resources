const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const pirates = require('./routes/pirates');

app.use(morgan('dev'));

app.use('/api/pirates', pirates);

app.use(errorHandler);

module.exports = app;