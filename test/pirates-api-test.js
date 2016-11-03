const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const assert = chai.assert;
chai.use( chaiHttp );

// start the db, and store connection, 
// so we can clear db
const connection = require( '../lib/setup-mongoose' );

const app = require( '../lib/app' );

describe( 'pirate', () => {

  before( done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'pirates';
      connection.db
				.listCollections({ name })
				.next( (err, collinfo) => {
  if (!collinfo) return done();
  connection.db.dropCollection(name, done);
});
    }
  });

  const request = chai.request( app );

  const luffy = {
    name: 'Monkey D Luffy',
    rank: 'captain'
  };

  it( '/GET all', done => {
    request
			.get( '/api/pirates' )
			.then( res => {
  assert.deepEqual( res.body, [] );
  done();
})
			.catch( done );
  });

  it( '/POST', done => {
    request
			.post( '/api/pirates' )
			.send( luffy )
			.then( res => {
  const pirate = res.body;
  assert.ok( pirate._id );
  luffy.__v = 0;
  luffy._id = pirate._id;
  done();
})
			.catch( done );

  });

  it( '/GET by id', done => {
    request
			.get( `/api/pirates/${luffy._id}` )
			.then( res => {
  const pirate = res.body;
  assert.deepEqual( pirate, luffy );
  done();
})
			.catch( done );
  });

  it( '/GET all after post', done => {
    request
			.get( '/api/pirates' )
			.then( res => {
  assert.deepEqual( res.body, [ luffy ] );
  done();
})
			.catch( done );
  });

  it( 'add a non-captain pirate', done => {
    request
			.post( '/api/pirates' )
			.send({ name: 'zoro', rank: 'swordsman' })
			.then( res => {
  assert.ok( res.body._id );
  done();
})
			.catch( done );
  });

  it( '/GET where rank is captain', done => {
    request
			.get( '/api/pirates' )
			.query({ rank: 'captain' })
			.then( res => {
  assert.deepEqual( res.body, [ luffy ] );
  done();
})
			.catch( done );
  });
	

  after( done => connection.close( done ) );
});