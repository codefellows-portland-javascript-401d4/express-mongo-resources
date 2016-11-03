const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe ('', () => {

  before((done) => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'riders';
      connection.db
        .listCollections({ name })
        .next((err, collInfo) => {
          if (!collInfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  it ('GET / should return empty array', () => {
    request 
      .get('/api/riders')
      .then((res) => {
        expect(res.body).to.deep.equal([]);
      });
  });

  const test_rider = {
    name: 'George Hincapie',
    team: 'HTC',
    role: 'leader',
    nationality: 'American'
  };

  it ('POST a rider stores the data and returns the stored object', (done) => {

    request
      .post('/api/riders')
      .send(test_rider)
      .then((res) => {
        const rider = res.body;
        expect(rider._id).to.be.ok;
        test_rider.__v = 0;
        test_rider._id = rider._id;
        done();
      })
      .catch(done);

  });

  it ('GET /:id returns the correct rider', (done) => {

    request
      .get(`/api/riders/${test_rider._id}`)
      .then((res) => {
        expect(res.body).to.deep.equal(test_rider);
        done();
      })
      .catch(done);
  });

  it ('GET / returns all riders after POST', (done) => {

    request
      .get('/api/riders/')
      .then((res) => {
        expect(res.body).to.deep.equal( [ test_rider ] );
        done();
      })
      .catch(done);
  });

  const another_rider = {
    name: 'Mark Cavendish',
    team: 'HTC',
    role: 'sprinter',
    nationality: 'Manx'
  };

  it ('adds a rider with a different role', (done) => {

    request
      .post('/api/riders')
      .send(another_rider)
      .then((res) => {
        const new_rider = res.body;
        expect(new_rider._id).to.be.ok;
        another_rider.__v = 0;
        another_rider._id = new_rider._id;
        done();
      })
      .catch(done);

  });

  it ('returns only riders who are sprinters', (done) => {
    request
      .get('/api/riders')
      .query({ role: 'sprinter' })
      .then((res) => {
        expect(res.body[0].name).to.equal('Mark Cavendish');
        done();
      })
      .catch(done);
  });

  after((done) => {
    connection.close(done);
  });

  // TODO: add test for update (e.g. Jan Ullrich gained weight during the off-season)
  // it ('updates specific rider info given id', (done) => {
    
  // });

  // TODO: add test for delete
  // it ('deletes specific rider given id', (done) => {
    
  // });

});