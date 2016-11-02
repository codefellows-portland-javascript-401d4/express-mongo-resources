const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const resHandler = require('./resHandler.js');
const notes = require('./routes/notes.js');
const tags = require('.routes/tags.js');
const webArticles = require('./routes/webArticles');
const errHandler = require('./errHandler');

const app = express();
const indexHtml = fs.createReadStream('./public/index.html');

// paths
// NOTE: app statements check routes from top to bottom

app.use(morgan('dev'));

app.use('/notes', notes);

app.use('/tags', tags);

app.use('webArticles', webArticles);

//serves index.html if GET for '/'
app.get('/', (req, res) => {
  indexHtml.pipe(res);
});

//error & 400 handling
app.use(errHandler);

app.use((req, res) => {
  res.status = 400;
  resHandler.errHandler(res);
});

module.exports = app;