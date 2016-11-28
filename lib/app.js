const express = require('express');
const app = express();
const cities = require('./routes/cities');
const countries = require('./routes/countries');
const errorHandler = require('./errorHandler');

app.use('/cities', cities);
app.use('/countries', countries);

app.use(errorHandler);

module.exports = app;