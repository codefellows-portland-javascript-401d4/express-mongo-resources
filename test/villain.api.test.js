'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('villain end to end test', () => {

    before(done => {
        const CONNECTED = 1;
        if(connection.readyState == CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'villains';
            connection.db
                .listCollections({name})
                .next((err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const request = chai.request(app);

    const thanos = {
        name: 'Thanos',
        ability: 'Telekinesis',
        universe: 'Marvel',
        created: '1973'
    };

    const joker = {
        name: 'The Joker',
        ability: 'Mastermind',
        universe: 'DC',
        created: '1940'
    };

    it('GETs all', done => {
        request
            .get('/villains/')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POSTs', done => {
        request
            .post('/villains')
            .send(thanos)
            .then(res => {
                const villain = res.body;
                thanos.__v = 0;
                thanos._id = villain._id;
            })
            .catch(done);

        request
            .post('/villains')
            .send(joker)
            .then(res => {
                const villain = res.body;
                joker.__v = 0;
                joker._id = villain._id;
                done();
            })
            .catch(done);
    });

    it('GETs by ID', done => {
        request
            .get(`/villains/${thanos._id}`)
            .then(res => {
                const villain = res.body;
                assert.deepEqual(villain, thanos);
                done();
            })
            .catch(done);
    });

    it('GETs where universe is Marvel', done => {
        request
            .get('/villains')
            .query({ universe : 'Marvel' })
            .then(res => {
                assert.deepEqual(res.body, [thanos]);
                done();
            })
            .catch(done);
    });

    it('Changes a field with PUT', done => {
        const thanos2 = {
            name: 'Thanos',
            ability: 'Telekinesis',
            universe: 'Marvel',
            created: '1973'
        };
        request
            .put(`/villains/${thanos._id}`)
            .send(thanos2)
            .then(res => {
                const villain = res.body;
                thanos2.ability = villain.ability;
                done();
            })
            .catch(done);
    });

    it('DELETEs by ID', done => {
        request
            .delete(`/villains/${joker._id}`)
            .then(res => {
                assert.deepEqual(res.body, joker);
                done();
            })
            .catch(done);
    });

    it('DELETEs villains collection', done => {
        request
            .delete('/villains')
            .then(res => {
                assert.deepEqual(res.body, true);
                done();
            })
            .catch(done);
    });

});
