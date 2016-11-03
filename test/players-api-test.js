const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const assert = chai.assert;
chai.use( chaiHttp );

// start the db, and store connection, 
// so we can clear db
const connection = require( '../lib/setup-mongoose' );

const app = require( '../lib/app' );

describe( 'player api', () => {

  before( done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'players';
      connection.db
				.listCollections({ name })
				.next( (err, collinfo) => {
  if (!collinfo) return done();
  connection.db.dropCollection(name, done);
});
    }
  });

  const request = chai.request( app );

  const davis = {
    name: 'Ryon Healy',
    team: 'Athletics'
  };

  it( '/GET all', done => {
    request
			.get( '/api/players' )
			.then( res => {
  assert.deepEqual( res.body, [] );
  done();
})
			.catch( done );
  });

  it( '/POST', done => {
    request
			.post( '/api/players' )
			.send( davis )
			.then( res => {
  const player = res.body;
  assert.ok( player._id );
  davis.__v = 0;
  davis._id = player._id;
  done();
})
			.catch( done );

  });

  it( '/GET by id', done => {
    request
			.get( `/api/players/${davis._id}` )
			.then( res => {
  const player = res.body;
  assert.deepEqual( player, davis );
  done();
})
			.catch( done );
  });

  it( '/GET all after post', done => {
    request
			.get( '/api/players' )
			.then( res => {
  assert.deepEqual( res.body, [ davis ] );
  done();
})
			.catch( done );
  });

  it( 'add a non-Athletics player', done => {
    request
			.post( '/api/players' )
			.send({ name: 'Kris Bryant', team: 'Cubs' })
			.then( res => {
  assert.ok( res.body._id );
  done();
})
			.catch( done );
  });

  it( '/GET where team is Athletics', done => {
    request
			.get( '/api/players' )
			.query({ team: 'Athletics' })
			.then( res => {
  assert.deepEqual( res.body, [ davis ] );
  done();
})
			.catch( done );
  });
	
//  1) player api "after all" hook:
//      Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.

  // after( done => connection.close( done ) );
});