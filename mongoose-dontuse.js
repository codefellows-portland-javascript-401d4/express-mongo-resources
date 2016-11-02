const mongoose = require('mongoose');

//make sure we're using native promises
//not the library that comes with mongodb

mongoose.Promise = Promise;

const dbURI = 'mongodb://localhost/mythical';
//mongo will create this database for you if it doesn't exist

mongoose.connect(dbURI);

const schema = new mongoose.Schema({
    name: String,
    horn: String
})

const Unicorn = mongoose.model('Unicorn', schema);

//create a new unicorn
// const lilac = new Unicorn({ name : 'lilac', horn: 'titanium' });

// lilac
//     .save()
//     .then(savedUnicorn => { console.log(savedUnicorn); })
//     .catch(err => { console.log(err); });

Unicorn.find()
    .then(unicorns => console.log(unicorns));