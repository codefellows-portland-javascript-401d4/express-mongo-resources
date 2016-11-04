const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

// start db ... store connection ... clear db
const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');

describe('cat', () => {

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'cats';
      connection.db
        .listCollections({name})
        .next((err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  // test case cat object
  const BritCat = {
    breed: 'Calico',
    color: 'multicolor',
    gender: 'M'
  };

  it('/GET all', done => {
    request
      .get('/cats')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('/POST', done => {
    request
      .post('/cats')
      .send(BritCat)
      .then(res => {
        const cat = res.body;
        assert.ok(cat._id);
        BritCat._v = 0;
        BritCat._id = cat._id;
        done();
      })
      .catch(done);
  });

  it('/GET by id', done => {
    request
      .get(`/cats/${BritCat._id}`)
      .then(res => {
        const cat = res.body;
        assert.deepEqual(cat, BritCat);
        done();
      })
      .catch(done);
  });

  it('/GET all after post', done => {
    request
      .get('/cats')
      .then(res => {
        assert.deepEqual(res.body, [BritCat]);
        done();
      })
      .catch(done);
  });

  it('add a new breed of cat', done => {
    request
      .post('/cats')
      .send({breed: 'Pharaoh', color: 'bare skin', gender: 'F'})
      .then(res => {
        assert.ok(res.body._id);
        done();
      })
      .catch(done);
  });

  // it('change gender of BritCat', done => {
  //   request
  //     .get(`/cats/${BritCat._id}`)
  //
  // })

  it('/GET Calico cat', done => {
    request
      .get('/cats')
      .query({breed: 'Calico'})
      .then(res => {
        assert.deepEqual(res.body, [BritCat]);
        done();
      })
      .catch(done);
  });

});
