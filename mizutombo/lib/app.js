const express = require('express');
const app = express();
const dogs = require('./routes/dog-routes');
const cats = require('./routes/cat-routes');
const errorHandler = require('./error-handler');

// routes from browser / Postman access point
app.use('/dogs', dogs); // route to dogs collection
app.use('/cats', cats); // route to cats collection

// error handler
app.use(errorHandler);

module.exports = app;
