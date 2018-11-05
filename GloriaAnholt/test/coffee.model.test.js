/** Created by Gloria Anholt on 11/4/16. **/

const assert = require('chai').assert;
const Coffee = require('../lib/models/coffee');

describe('Coffee model', () => {

  it('validates that name and visited are set', done => {

    const coffeeShop = new Coffee({
      name: "Test Coffeeshop",
      visited: true
    });

    coffeeShop.validate(err => {
      if (!err) done();
      else done(err);
    });

  });


  it('ensures that a name is required', done => {

    const noname = new Coffee({
      visited: true,
      address: '1234 Main St'
    });

    noname.validate(err => {
      if (err) done();
      else done('an error should have happened');
    });

  });

  it('ensures zip is a either a number or a string of only numbers', done => {

    const weirdname = new Coffee({
      name: 'weirdname',
      zipcode: 'Not a zipcode',
      visited: false
    });

    weirdname.validate(err => {
      if (err) done();
      else done('Numerical names shouldnt be a thing');
    });

  });

  it('defaults visited to false', done => {

    const falsycoffee = new Coffee({
      name: 'Never Visited',
      phone: 5038675309
    });

    falsycoffee.validate(err => {
      if (err) return done(err);
      assert.equal(falsycoffee.visited, false);
      done();
    });

  });

});