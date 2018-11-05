const Cat = require('../lib/models/cat-schema');
const assert = require('chai').assert;

describe('Cat schema', () => {
  it('validates with breed, color, and gender', done => {
    const cat = new Cat({
      breed: 'breed',
      color: 'color',
      gender: 'gender'
    });
    cat.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('breed is required', done => {
    const cat = new Cat();
    cat.color = 'black';
    cat.gender = 'M';

    cat.validate(err => {
      assert.isOk(err, 'breed should have been required');
      done();
    });
  });

  it('color is required', done => {
    const cat = new Cat();
    cat.gender = 'M';
    cat.breed = 'Manx';

    cat.validate(err => {
      assert.isOk(err, 'color should have been required');
      done();
    });
  });

  it('gender is required', done => {
    const cat = new Cat();
    cat.breed = 'Manx';
    cat.color = 'black';

    cat.validate(err => {
      assert.isOk(err, 'gender should have been required');
      done();
    });
  });

});
