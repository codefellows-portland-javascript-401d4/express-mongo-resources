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

    it('checks the mean and stdev of the game characters attackpower and age are within expected', done => {
        request
            .get('/gamechars/statistics')
            .then(stats => {
                const agestats = stats.body.age_stats;
                const powerstats = stats.body.power_stats;
                assert.isAtLeast(agestats.mean, 64);
                assert.isAtLeast(agestats.sd, 110);
                assert.isAtLeast(powerstats.mean, 375)
                assert.isAtLeast(powerstats.sd, 360);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('/GETS all resources and make sure correct number is there', done => {
        request
            .get('/gamechars')
            .then(resource => {
                assert.equal(resource.body.length, 11);
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