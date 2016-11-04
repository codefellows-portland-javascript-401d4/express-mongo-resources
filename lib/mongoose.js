'use strict';

const mongoose = require('mongoose');
mongoose.Promise;

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/art';
mongoose.connect(dbURI);

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error', err);
});
