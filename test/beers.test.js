/** Created by Gloria Anholt on 11/3/16. **/

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

require( '../lib/setup-mongoose' );
const app = require('../lib/app');

describe('the beer routes and models', () => {

  const server = chai.request(app);

  it('requests beer api and gets results from the db', done => {

    const expectedResults = '[{"_id":"581a8d26ca8a26db175663f7","name":"Belmont Station","streetAddress":"4500 SE Stark St","zipcode":97215,"phone":5032328538,"brewery":false,"bestBeer":null,"visited":true},{"_id":"581a8d34ca8a26db175663f8","name":"Lompoc 5th Quadrant","streetAddress":"3901 N Williams Ave","zipcode":97227,"phone":5032883996,"brewery":true,"bestBeer":"Proletariat Red","visited":true},{"_id":"581a8d3dca8a26db175663f9","name":"Laurelwood Public House & Brewery","streetAddress":"5115 NE Sandy Blvd","zipcode":97213,"phone":5032820622,"brewery":true,"bestBeer":"Workhorse IPA","visited":true}]';

    server
      .get('/api/beer')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      });

  });


  it('queries by a brewery name and gets results', done => {

    const expectedResults = '{"_id":"581a8d26ca8a26db175663f7","name":"Belmont Station","streetAddress":"4500 SE Stark St","zipcode":97215,"phone":5032328538,"brewery":false,"bestBeer":null,"visited":true}';

    server
      .get('/api/beer/Belmont%20Station') // there's a space in the name
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      });

  });

});