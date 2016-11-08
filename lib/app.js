const express = require('express');
const app = express();
const errorHandler = require('./errorhandler');
const cats = require('./routes/cats');
const birbs = require('./routes/birbs');

app.use('/api/cats', cats);
app.use('/api/birbs', birbs);
app.use(errorHandler);

module.exports = app;