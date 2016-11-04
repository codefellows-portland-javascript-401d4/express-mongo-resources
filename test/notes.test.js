const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//need to connect to db
const connection = require('../lib/set-mongoose');

const app = require('../lib/app');

describe('the note model', () => {
  before((done) => {
    const CONNECTED = 1;
    console.log('in note model', 'readyState',connection.readyState);
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'notes';
      connection.db
        .listCollections({name})
        .next((err, callinfo) => {
          if(!callinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const noteTested = 
    {
      title: 'note for testing',
      text: 'test and learn',
      tag: ['notes', 'terminal', 'testing']
    };
  
  it.only('navigates to POST and stashes a new note', (done) => {
    request
      .post('/notes/noteTested')
      .send(noteTested)
      .then((res) => {
        const note = res.body;
        console.log('note', res.body);
        expect(note.data._id).to.be.ok;
        noteTested.__v = 0;
        noteTested._id = note.data._id;
        done();
      })
      .catch(done);
  });

  it.only('navigates to the root and GETs all notes', (done) => {
    request
      .get('/')
      .then((res) => {
        expect(res.body).to.deep.equal({});
        done();
      })
      .catch(done);
  });

  it('navigates to /:id and GETs by id', (done) => {
    request
      .get(`/notes/${gitTested._id}`)
      .then((res) => {
        const note = res.body;
        expect(note).to.deep.equal([gitTested]);
        done();
      })
      .catch(done);
  });

  it('stashes a note with no tags', (done) => {
    request
      .post('/notes')
      .send({title: 'emptyTest', text: 'not so empty', tags: '[]'})
      .then((res) => {
        expect.ok(res.body._id);
        done();
      })
      .catch(done);
  });

  it('finds a note with a tag named testing', (done) => {
    request
      .get('/notes')
      .query({tag: 'testing'})
      .then((res) => {
        expect(res.body).to.deep.equal([gitTested]);
        done();
      })
      .catch(done);
  });

  // after((done) => {
  //   console.log('in the notes test');
  //   connection.close(done);
  // });

});