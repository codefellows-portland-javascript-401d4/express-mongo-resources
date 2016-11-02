//check that teams.json = teamsOriginal.json before testing (it will be so after testing)
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/app');
const bodyParser = require( '../lib/body-parser' )();
const EventEmitter = require('events');

let request = chai.request(server);

//original two-team data resource displayed as text
let origTeamsText = 'Oakland Athletics\nChicago Cubs\n';
let basedir = './lib/models/';
let filename = 'teamsTest.json';

describe('Seven E2E tests for Express single-resource http server', () => {

  it('error message on non-existent path', done => {
    request
            .get('/DoesNotExist')
            .end((err, res) => {
              // if (err) return done(err); it IS an error; need to verify proper response
              assert.equal(res.text, 'Page not found!');
              done();
            });
  });

  it('bad POST - confirms error handling for a malformed request', done => {
    newTeam = 'not proper JSON';   
    request
     .post('/teams')
     .send(newTeam)
     .end((err, res) => {
      //  if (err) return done(err); it IS an error; need to verify proper response
       assert.equal(res.text, '{"error":"Bad Request!"}');
       done();
     });
  });

  it('a path (/teams) uses url.pathname', done => {
    request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText);
              done();
            });
  });

  it('/recognizes /teams/:team (fka querypath)', done => {
    request
            .get('/teams/Cubs')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, 'Chicago Cubs');
              done();
            });
  });

  //City mispelled on purpose for next test purposes
  it('POST - adds team to data store; confirm by checking that /teams page updates', done => {
    newTeam = {"name":"Giants", "city": "San Frcisco"};   // eslint-disable-line
    request
     .post('/teams')
     .send(newTeam)
     .end((err, res) => {
       if (err) return done(err);
       request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText + 'San Frcisco Giants\n');
              done();
            });
     }); 
  });

  it('PUT - edits team city in data store; confirm by checking that /teams page updates', done => {
    editTeam = {"name":"Giants", "city": "San Francisco"};   // eslint-disable-line
    request
     .put('/teams/Giants')
     .send(editTeam)
     .end((err, res) => {
       if (err) return done(err);
       request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText + 'San Francisco Giants\n');
              done();
            });
     }); 
  });   

  it('DELETE - removes team from data store; confirm by checking that /teams page updates', done => {
    delTeam = {"name":"Giants", "city": "San Francisco"};   // eslint-disable-line
    request
     .delete('/teams/Giants')
     .send(delTeam)
     .end((err, res) => {
       if (err) return done(err);
       request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText);
              done();
            });
     }); 
  });

});

describe( 'body parser middleware unit testing', () => {

  it( 'parses body', done => {
    const req = new EventEmitter();
    const next = () => {
      assert.deepEqual(req.body, {name: 'Giants', city: 'San Francisco'});
      done();
    };

    bodyParser(req, null, next);

    req.emit('data', '{"name": "Giants", "city": "San Francisco"}');
    req.emit('end');

  });
});













