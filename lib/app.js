/** Created by Gloria Anholt on 11/2/16. **/

const express = require('express');
const app = express();

const errorHandler = require('./error-handler');
//const coffee = require('./routes/coffeeRouter');
const beer = require('./routes/beerRouter');

//app.use('/api/coffee', coffee);
app.use('/api/beer', beer);
app.use(errorHandler);

module.exports = app;
