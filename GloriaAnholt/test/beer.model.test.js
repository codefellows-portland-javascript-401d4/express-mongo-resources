/** Created by Gloria Anholt on 11/3/16. **/

const assert = require('chai').assert;
const Beer = require('../lib/models/beer');

describe('Beer model', () => {


  it('validates that name and visited are set', done => {

    const brewery = new Beer({
      name: "Test Brewery",
      visited: true
    });

    brewery.validate(err => {
      if (!err) done();
      else done(err);
    });

  });


  it('ensures that a name is required', done => {

    const noname = new Beer({
      visited: true,
      address: '1234 Main St'
    });

    noname.validate(err => {
      if (err) done();
      else done('an error should have happened');
    });

  });

  it('ensures zip is a either a number or a string of only numbers', done => {

    const weirdname = new Beer({
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

    const falsybeer = new Beer({
      name: 'Never Visited',
      phone: 5038675309
    });

    falsybeer.validate(err => {
      if (err) return done(err);
      assert.equal(falsybeer.visited, false);
      done();
    });

  });

});