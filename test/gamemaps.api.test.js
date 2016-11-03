const chai = require('chai');
const assert = chai.assert;
const chaihttp = require('chai-http');
chai.use(chaihttp);
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('tests the gamemap api', () => {
    before (done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'gamemap';
            connection.db
                .listCollections({name})
                .next((err, callinfo) => {
                    if (!callinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const request = chai.request(app);
    const hyrule = {
        name: 'Hyrule',
        environment: 'multi',
        size: 100000000
    };
    const update = {
        environment: 'shadow'
    };

    it('checks the mean and stdev of the game maps areas are within expected', done => {
        request
            .get('/gamemaps/statistics')
            .then(stats => {
                const areastats = stats.body.map_stats;
                assert.equal(areastats.mean, 1000);
                assert.equal(areastats.sd, 0);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('/GETS all resources', done => {
        request
            .get('/gamemaps')
            .then(resource => {
                assert.deepEqual(resource.body[0],
                {
                    "__v": 0,
                    "_id": "581b691333fbcd3f2cbc05c7",
                    "environment": "lake",
                    "name": "Big Lakes",
                    "size": 1000,
                    "unitOfMeasure": "cubits"
                });
                done();
            })
            .catch( err => {
                console.error(err);
                done(err);
            });
    });

    it('/POSTs hyrule', done => {
        request
            .post('/gamemaps')
            .send(hyrule)
            .then(res => {
                const gamemap = res.body;
                assert.ok(gamemap._id);
                hyrule._id = gamemap._id;
                hyrule.__v = 0;
                hyrule.unitOfMeasure = 'cubits'
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

    it('/GETS all hyrule by id', done => {
        request
            .get('/gamemaps/' + hyrule._id)
            .then(resource => {
                assert.deepEqual(resource.body, hyrule);
                done();
            })
            .catch( err => {
                console.error(err);
                done(err);
            });
    });

    it('/PUTS new data to hyrule such that environment becomes shadow', done => {
        request
            .put('/gamemaps/' + hyrule._id)
            .send(update)
            .then(res => {
                hyrule.environment = 'shadow';
                assert.deepEqual(res.body, hyrule);
                done();
            })
            .catch(err => {
                console.error(err);
                cone(err);
            });
    });

    it('/DELETEs hyrule', done => {
        request
            .del('/gamemaps/' + hyrule._id)
            .then(res => {
                assert.deepEqual(res.body, hyrule);
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });
});

