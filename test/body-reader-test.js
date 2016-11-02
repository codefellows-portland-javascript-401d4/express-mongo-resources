const bodyReader = require('../lib/bodyReader.js');
const assert = require('chai').assert;
const EventEmitter = require('events');

describe('unit testing for bodyReader', () => {
  it('should parse the body of an incoming request', done => {
    let req = new EventEmitter();
    let next = () => {
      assert.deepEqual(req.body, {"teamName": "Navi"});
      done();
    };
    bodyReader(req, null, next);
    req.emit('data', '{"teamName":"Navi"}');
    req.emit('end');
  })
})