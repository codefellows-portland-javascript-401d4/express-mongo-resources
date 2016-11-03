const Pirate = require('../lib/models/pirate');
const assert = require('chai').assert;

describe('Pirate model', () => {

  it('validates with name and rank', done => {
    const pirate = new Pirate({
      name: 'name',
      rank: 'rank'
    });

    pirate.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('name is required', done => {
    const pirate = new Pirate();
    pirate.rank = 'ensign';

    pirate.validate(err => {
      assert.isOk(err, 'name should have been required');
      done();
    });
  });

  it('age must be a number', done => {
    const pirate = new Pirate({
      name: 'pirate',
      age: 'not a number'
    });
			
    pirate.validate(err => {
      assert.isOk(err, 'expected error on age data type');
      done();
    });
  });

  it('rank defaults to "ensign"', done => {
    const pirate = new Pirate({
      name: 'Lackey'
    });

    pirate.validate(err => {
      assert.isNotOk(err);
      assert.equal(pirate.rank, 'ensign');
      done();
    });
  });



});
