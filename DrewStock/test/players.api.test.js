const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require( '../lib/setup_mongoose');

const app = require( '../lib/app' );

describe( 'players e2e', () => {

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

    const request = chai.request(app);

    const antonio = {
        playerName: 'Antonio Brown',
        position: 'WR'
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
				.send( antonio )
				.then( res => {
    const player = res.body;
    // console.log(team);
    assert.ok( player._id );
    antonio.__v = 0;
    antonio._id = player._id;
    console.log(antonio);
    done();
})
			.catch( done );

    });

    it( '/GET by id', done => {
        request
    .get( `/api/players/${antonio._id}` )
			.then( res => {
    const player = res.body;
    assert.deepEqual( player, antonio );
    done();
})
			.catch( done );
    });

    const updated = {
        playerName: 'Antonio Brown',
        position: 'QB'
    };


    it('/PUT - updates a player', done => {
        request
            .put(`/api/players/${antonio._id}`)
            .send(updated)
            .then(res => {
                const updated = res.body;
                console.log(updated);
                assert.deepEqual(res.body, updated);
                assert.deepEqual(res.body.position, 'QB');
                done();
            })
            .catch(done);
    });


    it('/DELETE - deletes a player', done => {
        request
            .delete(`/api/players/${antonio._id}`)
            .then(res => {
                const removed = res.body;
                console.log(removed);
                assert.deepEqual(res.body, removed);
                done();
            })
            .catch(done);
    });

});
