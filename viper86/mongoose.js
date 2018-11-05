'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

const dbURI = 'mongodb://localhost/heroes';
mongoose.connect(dbURI);

mongoose.connection.on('error', err => {
    console.log('Mongoose default connection error:', err);
});

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ability: String,
    universe: String,
    created: String,
    anti_hero: Boolean
});

const Hero = mongoose.model('Heroes', schema);

const deadpool = new Hero({ name: 'Deadpool', ability: 'Regeneration', universe: 'Marvel', created: '1991', anti_hero: true});

deadpool.save()
    .then(savedHero => console.log(savedHero))
    .catch(err => console.error(err));

Hero.find()
    .then(heroes => console.log(heroes));