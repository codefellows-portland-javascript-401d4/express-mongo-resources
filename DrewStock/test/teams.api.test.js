const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require( '../lib/setup_mongoose');

const app = require( '../lib/app' );

describe( 'teams e2e', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'teams';
            connection.db
						.listCollections({ name })
						.next( (err, collinfo) => {
    if (!collinfo) return done();
    connection.db.dropCollection(name, done);
});
        }
    });

    const request = chai.request(app);

    const snap = {
        teamName: 'Oh Snap!',
        wins: 8
    };

    it( '/GET all', done => {
        request
				.get( '/api/teams' )
				.then( res => {
    assert.deepEqual( res.body, [] );
    done();
})
			.catch( done );
    });

    it( '/POST', done => {
        request
				.post( '/api/teams' )
				.send( snap )
				.then( res => {
    const team = res.body;
    // console.log(team);
    assert.ok( team._id );
    snap.__v = 0;
    snap._id = team._id;
    console.log(snap);
    done();
})
			.catch( done );

    });

    it( '/GET by id', done => {
        request
            .get( `/api/teams/${snap._id}` )
			.then( res => {
    const team = res.body;
    assert.deepEqual( team, snap );
    done();
})
			.catch( done );
    });

    const updated = {
        teamName: 'New Name',
        wins: 0
    };

    it('/PUT - updates a team', done => {
        request
            .put(`/api/teams/${snap._id}`)
            .send(updated)
            .then(res => {
                const updated = res.body;
                console.log(updated);
                assert.deepEqual(res.body, updated);
                assert.deepEqual(res.body.wins, 0);
                done();
            })
            .catch(done);
    });


    it('/DELETE - deletes a team', done => {
        request
            .delete(`/api/teams/${snap._id}`)
            .then(res => {
                const removed = res.body;
                console.log(removed);
                assert.deepEqual(res.body, removed);
                done();
            })
            .catch(done);
    });


    after( done => {
        connection.close( done );
    });
});
