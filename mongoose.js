/** Created by Gloria Anholt on 11/2/16. **/


const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbURI = 'mongodb://localhost/portland';
mongoose.connect(dbURI);

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error occurred: ', err);
});


const coffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  streetAddress: String,
  zipcode: Number,
  phone: Number,
  visited: Boolean,
  favoriteDrink: String
});

const beerSchema = new mongoose.Schema({
  name: String,
  streetAddress: String,
  zipcode: Number,
  phone: Number,
  visited: Boolean,
  brewery: Boolean,
  bestBeer: String
});

exports.Coffee = mongoose.model('CoffeeShops', coffeeSchema);
exports.Beer = mongoose.model('BeerShops', beerSchema);