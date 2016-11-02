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
  visited: {
    type: Boolean,
    required: true,
    default: false
  },
  favoriteDrink: String
});

module.exports = mongoose.model('CoffeeShops', coffeeSchema);