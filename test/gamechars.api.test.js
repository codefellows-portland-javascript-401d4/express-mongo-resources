const chai = require('chai');
const assert = chai.assert;
const chaihttp = require('chai-http');
chai.use(chaihttp);
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('tests the gamechar api', () => {
    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'gamechar';
            connection.db
                .listCollections({name})
                .next((err, callinfo) => {
                    if (!callinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const request = chai.request(app);
    const starfox = {
        name: 'Fox',
        game: 'Smash Bros',
        age: 23,
        attackpower: 219
    };
    const update = {
        attackpower: 9000
    };

    it('/GETS all resources', done => {
        request
            .get('/gamechars')
            .then(resource => {
                assert.deepEqual(resource.body, []);
                done();
            })
            .catch( err => {
                console.error(err);
                done(err);
            });
    });

    it('/POSTs starfox', done => {
        request
            .post('/gamechars')
            .send(starfox)
            .then( res => {
                const gamechar = res.body;
                assert.ok(gamechar._id);
                starfox._id = gamechar._id;
                starfox.__v = 0;
                done();
            })
            .catch( err => {
                console.error(err);
                done(err);
            });
    });

    it('/GETS starfox', done => {
        request
            .get('/gamechars/' + starfox._id)
            .then( res => {
                assert.deepEqual(res.body, starfox);
                done();
            })
            .catch( err => {
                console.log(err);
                done(err);
            });
    });

    it('/PUTS new info on starfox', done => {
        request
            .put('/gamechars/' + starfox._id)
            .send(update)
            .then(res => {
                starfox.attackpower = 9000;
                assert.deepEqual(res.body, starfox);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('/DELETESs starfox by id', done => {
        request
            .del('/gamechars/' + starfox._id)
            .then( res => {
                assert.deepEqual(res.body, starfox);
                done();
            })
            .catch( err => {
                console.log(err);
                done(err);
            })
    });
});