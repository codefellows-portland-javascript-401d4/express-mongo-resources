const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//need a connection to db
const connection = require('../lib/set-mongoose');

const app = require('../lib/app');

describe('the tag model', () => {
  before((done) => {
    const CONNECTED = 1;
    // console.log(connection.readyState);
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'tags';
      // console.log('in tag drop Collection', connection);
      connection.db
        .listCollections({name})
        .next((err, callinfo) => {
          // console.log('tag test err', err);
          if (err) done(err);
          if (!callinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const tagTested =
    {
      name:'tag for testing',
      description: 'test and learn',
      heat: 'warm'
    };

  it('navigates to POST and stashes a new tag', (done) => {
    request
      .post('/tags/tagTested')
      .send(tagTested)
      .then((res) => {
        const tag = res.body;
        expect(tag.data._id).to.be.ok;
        tagTested.__v = 0;
        tagTested._id = tag.data._id;
        done();
      })
      .catch(done);
  });

  it('navigates to the root and GETs all tags', (done) => {
    request
      .get('/')
      .then((res) => {
        expect(res.body).to.deep.equal({});
        done();
      })
      .catch(done);
  });

  it('navigates to /:id and GETs a tag by id', (done) => {
    request
      .get(`/tags/${tagTested._id}`)
      .then((res) => {
        const tag = res.body;
        expect(tag.data.description).to.deep.equal('test and learn');
        done();
      })
      .catch(done);
  });

  it('stashes a tag with no heat', (done) => {
    request
      .post('/tags/:id')
      .send({name: 'empty tag test', description: 'just for testing', heat: ''})
      .then((res) => {
        expect(res.body.data._id).to.be.ok;
        done();
      })
      .catch(done);
  });

  it('finds a tag with a heat named warm', (done) => {
    request
    .get('/notes/:id')
    .query({heat: 'warm'})
    .then((res) => {
      expect(res.body.data.heat).to.deep.equal('warm');
      done();
    })
    .catch(done);
  });

  // after((done) => {
  //   console.log('in the tags test');
  //   connection.close(done);
  // });



});