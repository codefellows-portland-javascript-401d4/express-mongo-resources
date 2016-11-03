const server = require('../lib/server');

const EventEmitter = require('events');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//E2E testing the server
describe('E2E testing the server', () => {
  it('returns status code = 200 on successful requests', () => {
    chai.request(server)
      .get('/notes')
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((err) => {
        return err;
      });
  });

  it('sends response to request for specific path', () => {
    chai.request(server)
      .get('/notes')
      .then((res) => {
        expect(res.text).to.be.equal(/*what goes here?*/);
      });
  });

  it('sends response to request for specific file', () => {
    chai.request(server)
      .get('test1')
      .then((res) => {
        expect(res.text).to.equal(/*what goes here?*/);
      });
  });






});