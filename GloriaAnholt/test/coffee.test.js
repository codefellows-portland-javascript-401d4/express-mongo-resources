/** Created by Gloria Anholt on 11/4/16. **/

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const connection = require( '../lib/setup-mongoose' );
const app = require('../lib/app');


describe('the routes and models of coffeeshops', () => {

  const server = chai.request(app);

  before(done => {

    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) setupCoffee();
    else connection.on('open', setupCoffee);

    function setupCoffee() {
      const name = 'coffee';
      connection.db
        .listCollections({name})
        .next((err, collInfo) => {
          if (!collInfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });


  it('adds a new coffeeshop to the list', done => {

    const Ristretto =  {
      "name":"Ristretto Roasters",
      "streetAddress":"N Williams St",
      "zipcode":97211,
      "phone":5038675309,
      "visited":true,
      "favoriteDrink":"Cowboy Blend"
    };

    server
      .post('/api/coffee')
      .send(Ristretto)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Ristretto Roasters added!');
        done();
      });
  });

  it('queries by a coffeeshop name and gets results', done => {

    const expectedResults = {
      "name":"Ristretto Roasters",
      "streetAddress":"N Williams St",
      "zipcode":97211,
      "phone":5038675309,
      "visited":true,
      "favoriteDrink":"Cowboy Blend"
    };

    server
      .get('/api/coffee/Ristretto%20Roasters') // there's a space in the name
      .end((err, res) => {
        if (err) return done(err);
        let results = JSON.parse(res.text);
        assert.equal(results.name, expectedResults.name);
        assert.equal(results.streetAddress, expectedResults.streetAddress);
        assert.equal(results.zipcode, expectedResults.zipcode);
        assert.equal(results.phone, expectedResults.phone);
        assert.equal(results.visited, expectedResults.visited);
        assert.equal(results.favoriteDrink, expectedResults.favoriteDrink);

        done();
      });

  });

  it('updates a valid field in an existing coffee record', done => {

    const update = {"favoriteDrink": "Latin blend pour over"};

    server
      .put('/api/coffee/Ristretto%20Roasters')
      .send(update)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Ristretto Roasters updated.');
      });

    server
      .get('/api/coffee/Ristretto%20Roasters')
      .end((err, res) => {
        let results = JSON.parse(res.text);
        if (err) return done(err);
        assert.equal(results.favoriteDrink, update.favoriteDrink);
        done();
      });

  });

  it('deletes a record by name', done => {

    server
      .del('/api/coffee/Ristretto%20Roasters')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Ristretto Roasters removed.');
      });

    server
      .get('/api/coffee/Ristretto%20Roasters')
      .end((err, res) => {
        if (err) done();
        else done(err);
      });
  });

});