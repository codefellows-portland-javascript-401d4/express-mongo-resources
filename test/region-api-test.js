const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('region', () => {
  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'regions';
      connection.db
        .listCollections({name})
        .next((err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);
  const NA = {region: 'NA', teams: ['Evil Geniuses', 'FDL', 'CompLexity Gaming']};


  it('should save a file from a POST request', done => {
    request
    .post('/regions')
    .send(NA)
    .then(res => {
      assert.ok(res.body._id);
      NA._id = res.body._id;
      NA.__v = 0;
      done();
    })
    .catch(done);
  });

  it('should get all files', done => {
    request
      .get('/regions')
      .then(res => {
        assert.deepEqual(res.body, [NA]);
        done();
      })
      .catch(done);
  });

  it('should get a file by query string', done => {
    request
      .get('/regions')
      .query('NA')
      .then(res => {
        assert.deepEqual(res.body, [NA]);
        done();
      })
      .catch(done);
  });

  it('should get a file by id', done => {
    request
      .get(`/regions/${NA._id}`)
      .then(res => {
        assert.deepEqual(res.body, NA);
        done();
      })
      .catch(done);
  });

  it('should update a file', done => {
    request
      .put(`/regions/${NA._id}`)
      .send({teams: ['veggies', 'void boys', 'DC']})
      .then(res => {
        assert.deepEqual(res.body, { ok: 1, nModified: 1, n: 1 });
        done();
      })
      .catch(done);
  });


  it('should delete a file', done =>{
    request
      .del(`/regions/${NA._id}`)
      .then(res => {
        assert.equal(res.text, `Resource ${NA._id} was deleted`);
        done();
      })
      .catch(done);
  });
});