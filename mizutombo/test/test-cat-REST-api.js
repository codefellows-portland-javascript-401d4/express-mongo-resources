const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

// start db ... store connection ... clear db
const connection = require('../lib/mongoose-setup');

const app = require('../lib/app');

describe('cat', () => {

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) {
      dropCollection();
    }
    else
      connection.on('open', dropCollection);

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

  const BritCat = { // test case cat object
    breed: 'Calico',
    color: 'multicolor',
    gender: 'M'
  };

  it('/GET all', done => { // passes test for GET all when array is empty
    request
      .get('/cats')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('/POST', done => { // passes test for POST to 'cats' collection
    request
      .post('/cats')
      .send(BritCat)
      .then(res => {
        const cat = res.body;
        assert.ok(cat._id);
        BritCat.__v = 0;
        BritCat._id = cat._id;
        done();
      })
      .catch(done);
  });

  it('/GET by id', done => { // passes test for GET by id
    request
      .get(`/cats/${BritCat._id}`)
      .then(res => {
        const cat = res.body;
        assert.deepEqual(cat, BritCat);
        done();
      })
      .catch(done);
  });

  it('/GET all after post', done => { // passes test for GET all after POST
    request
      .get('/cats')
      .then(res => {
        assert.deepEqual(res.body, [BritCat]);
        done();
      })
      .catch(done);
  });

  it('add a new breed of cat', done => { // passes test for POST new breed of chaiHttp
    request
      .post('/cats')
      .send({breed: 'Pharaoh', color: 'bare skin', gender: 'F'})
      .then(res => {
        assert.ok(res.body._id);
        done();
      })
      .catch(done);
  });

  it('change gender of BritCat', done => { // passes test for PUT ... change gender of cat
    request
      .put(`/cats/${BritCat._id}`)
      .send({breed: 'Calico', color: 'multicolor', gender: 'F'})
      .then(res => {
        assert.ok(res.body._id);
        done();
      })
      .catch(done);
  });

  it('/GET Calico cat', done => { // passes test to GET the Calico cat
    request
      .get('/cats')
      .query({breed: 'Calico'})
      .then(res => {
        assert.deepEqual(res.body, [BritCat]);
        done();
      })
      .catch(done);
  });

  it('/DELETE BritCat', done => { // passes test to DELETE the BritCat
    request
      .del(`/cats/${BritCat._id}`)
      .then(res => {
        BritCat.__v = 0;
        assert.deepEqual(res.body, BritCat);
        done();
      })
      .catch(done);
  });

});
