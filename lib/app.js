const express = require('express');
const app = express();
// const errorHandler = require('./error-handler');
const morgan = require('morgan');

const riders = require('./routes/riders');
// const teams = require('./routes/teams');

app.use(morgan('dev'));
app.use('/api/riders', riders);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const code = err.code || 500;
  const error = (err.code === 500) ? 'Internal Server Error' : err.error;
  res.status(code).send(error);
});
// app.use('/api/teams', teams);

// app.use(errorHandler);

module.exports = app;