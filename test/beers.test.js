/** Created by Gloria Anholt on 11/3/16. **/

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const connection = require( '../lib/setup-mongoose' );
const app = require('../lib/app');

describe('the beer routes and models', () => {

  const server = chai.request(app);

  before(done => {

    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) setup();
    else connection.on('open', setup);

    function setup() {
      server.delete('/api/beer/Deschutes')
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }
  });



  it('posts new breweries to the list', done => {

    const Belmont =  {"name":"Belmont Station","streetAddress":"4500 SE Stark St","zipcode":97215,"phone":5032328538,"brewery":false,"bestBeer":null,"visited":true};
    const Lompoc = {"name":"Lompoc 5th Quadrant","streetAddress":"3901 N Williams Ave","zipcode":97227,"phone":5032883996,"brewery":true,"bestBeer":"Proletariat Red","visited":true};
    const Laurelwood = {"name":"Laurelwood Public House & Brewery","streetAddress":"5115 NE Sandy Blvd","zipcode":97213,"phone":5032820622,"brewery":true,"bestBeer":"Workhorse IPA","visited":true};
    const Deschutes = {"name":"Deschutes","phone":5038675309,"brewery":true,"visited":true};

    server
      .post('/api/beer')
      .send(Belmont)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Belmont Station added!');
      });

    server
      .post('/api/beer')
      .send(Lompoc)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Lompoc 5th Quadrant added!');
      });

    server
      .post('/api/beer')
      .send(Laurelwood)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Laurelwood Public House & Brewery added!');
      });

    server
      .post('/api/beer')
      .send(Deschutes)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Deschutes added!');
        done();
      });

  });

  // local db testing only
  it('queries by a brewery name and gets results', done => {

    const expectedResults = {
      "name":"Belmont Station",
      "streetAddress":"4500 SE Stark St",
      "zipcode":97215,
      "phone":5032328538,
      "brewery":false,
      "bestBeer":null,
      "visited":true
    };

    server
      .get('/api/beer/Belmont%20Station') // there's a space in the name
      .end((err, res) => {
        if (err) return done(err);
        let results = JSON.parse(res.text);
        assert.equal(results.name, expectedResults.name);
        assert.equal(results.streetAddress, expectedResults.streetAddress);
        assert.equal(results.zipcode, expectedResults.zipcode);
        assert.equal(results.phone, expectedResults.phone);
        assert.equal(results.brewery, expectedResults.brewery);
        assert.equal(results.bestBeer, expectedResults.bestBeer);
        assert.equal(results.visited, expectedResults.visited);
        done();
      });

  });

  it('updates a valid field in an existing record', done => {

    const update = { "bestBeer": "Mirror Pond"};
    const expectedResults = '[{"_id":"581a8d26ca8a26db175663f7","name":"Belmont Station","streetAddress":"4500 SE Stark St","zipcode":97215,"phone":5032328538,"brewery":false,"bestBeer":null,"visited":true},{"_id":"581a8d34ca8a26db175663f8","name":"Lompoc 5th Quadrant","streetAddress":"3901 N Williams Ave","zipcode":97227,"phone":5032883996,"brewery":true,"bestBeer":"Proletariat Red","visited":true},{"_id":"581a8d3dca8a26db175663f9","name":"Laurelwood Public House & Brewery","streetAddress":"5115 NE Sandy Blvd","zipcode":97213,"phone":5032820622,"brewery":true,"bestBeer":"Workhorse IPA","visited":true}, {"name":"Deschutes","phone":5038675309,"brewery":true,"visited":true,"bestBeer":"Mirror Pond"}]';

    server
      .put('/api/beer/Deschutes')
      .send(update)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Deschutes updated.');
        done();
      });

    server
      .get('/api/beer')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      });

  });

  it('deletes a record by name', done => {

    server
      .del('/api/beer/Deschutes')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Deschutes removed.');
      });

    server
      .get('/api/beer/Deschutes')
      .end((err, res) => {
        if (err) done();
        else done(err);
      });

  });

});