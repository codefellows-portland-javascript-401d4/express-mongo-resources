const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

//start the db, and store connection,
//so we can clear db
const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');

//SET UP MONGOOSE CONNECTION
describe('test books resource route', () => {

  before(done => {  
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else (connection.on('open', dropCollection));

    function dropCollection() {
      const name = 'books';
      connection.db
        .listCollections({name})
        .next((err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    };
  });

  const request = chai.request(app);

  const sawyer = {
    title: 'Tom Sawyer',
    author: 'Mark Twain',
    genres: ['novel']
  }; 
  const clemens = {
    title: 'Tom Sawyer',
    author: 'Samuel Clemens',
    genres: ['novel']
  };

  var bookResult = null;


  it('/GET all -- before', done => {
    request
      .get('/api/books')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('/POST', done => {
    request
      .post('/api/books')
      .send(sawyer)
      .then(res => {
        bookResult = res.body;
        sawyer.__v = 0;
        sawyer._id = bookResult._id;
        assert.deepEqual(bookResult, sawyer);
        done();
      })
      .catch(done);
  });

  it('/GET/:id', done => {
    request
      .get('/api/books')
      .query({_id:sawyer._id})
      .then(res => {
        bookResult = res.body;
        assert.deepEqual(bookResult, [sawyer]);
        done();
      })
      .catch(done);
  });

  it('/PUT/:id', done => {
    request
      .put(`/api/books/${sawyer._id}`)
      .send(clemens)      
      .then(res => {
        bookResult = res.body;
        clemens.__v = 0;
        clemens._id = bookResult._id;
        assert.deepEqual(bookResult, clemens);
        done();
      })
      .catch(done);
  });

  it('GET all -- after', done => {
    request
      .get('/api/books')
      .then(res => {
        assert.deepEqual(res.body, [clemens]);
        done();
      })
      .catch(done);
  });

  it('DELETE /:id', done => {
    request
      .delete('/api/books')
      .query({_id:sawyer._id})      
      .then(res => {
        bookResult = res.body;
        assert.deepEqual(bookResult, {});
        done();
      })
      .catch(done);
  });

  after( done => {
    connection.close( done );
  });  

});

