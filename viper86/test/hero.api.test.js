'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('hero end to end test', () => {

    before(done => {
        const CONNECTED = 1;
        if(connection.readyState == CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'heroes';
            connection.db
                .listCollections({name})
                .next((err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        };
    });

    const request = chai.request(app);

    const spiderman = {
        name: 'Spiderman',
        ability: 'Super Strength',
        universe: 'Marvel',
        created: '1962',
        anti_hero: false
    };

    const superman = {
        name: 'Superman',
        ability: 'Flight',
        universe: 'DC',
        created: '1938',
        anti_hero: false
    };

    it('GETs all', done => {
        request
            .get('/heroes/')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POSTs', done => {
        request
            .post('/heroes')
            .send(spiderman)
            .then(res => {
                const hero = res.body;
                spiderman.__v = 0;
                spiderman._id = hero._id;
            })
            .catch(done);

        request
            .post('/heroes')
            .send(superman)
            .then(res => {
                const hero = res.body;
                superman.__v = 0;
                superman._id = hero._id;
                done();
            })
            .catch(done);
    });

    it('GETs by ID', done => {
        request
            .get(`/heroes/${spiderman._id}`)
            .then(res => {
                const hero = res.body;
                assert.deepEqual(hero, spiderman);
                done();
            })
            .catch(done);
    });

    it('GETs where universe is Marvel', done => {
        request
            .get('/heroes')
            .query({ universe : 'Marvel' })
            .then(res => {
                assert.deepEqual(res.body, [spiderman]);
                done();
            })
            .catch(done);
    });

    it('Changes a field with PUT', done => {
        const spiderman2 = {
            name: 'Spiderman',
            ability: 'Spider Senses',
            universe: 'Marvel',
            created: '1962',
            anti_hero: false
        };
        request
            .put(`/heroes/${spiderman._id}`)
            .send(spiderman2)
            .then(res => {
                const hero = res.body;
                spiderman2.ability = hero.ability;
                done();
            })
            .catch(done);
    });

    it('DELETEs by ID', done => {
        request
            .delete(`/heroes/${superman._id}`)
            .then(res => {
                assert.deepEqual(res.body, superman);
                done();
            })
            .catch(done);
    });

    it('DELETEs heroes collection', done => {
        request
            .delete('/heroes')
            .then(res => {
                assert.deepEqual(res.body, true);
                done();
            })
            .catch(done);
    });

});
