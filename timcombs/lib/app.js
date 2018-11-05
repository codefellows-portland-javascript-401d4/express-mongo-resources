const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const notes = require('./routes/notes.js');
const tags = require('./routes/tags.js');
// const webArticles = require('./routes/webArticles');
const errHandler = require('./errHandler');

const app = express();
const indexHtml = fs.createReadStream('./public/index.html');

// paths
// NOTE: app statements check routes from top to bottom

app.use(morgan('dev'));

app.set('json spaces', 2);
app.use('/notes', notes);

app.use('/tags', tags);

//serves index.html if GET for '/'
app.get('/', (req, res) => {
  indexHtml.pipe(res);
});

// error and 400 handling
app.use((req, res) => {
  const mistake = {code: 400, error: 'no path by that name, please check your map.'};
  errHandler(mistake, req, res);
});

//catching the errors
app.use(errHandler);


module.exports = app;