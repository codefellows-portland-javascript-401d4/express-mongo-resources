'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe('artists api', () => {
    before(done => {
        function dropCollection() {
            const name = 'artists';
            connection.db
                .listCollections({ name })
                .next((error, collectinfo) => {
                    if(!collectinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
        const connected = 1;
        if(connection.readyState === connected) dropCollection();
        else connection.on('open', dropCollection);
    });

    const request = chai.request(app);

    const testPainter = {
        name: 'salvador dalí',
        style: 'surrealism'
    };

    it('/GET all', done => {
        request 
            .get('/artists')
            .then(response => {
                assert.deepEqual(response.body, []);
                done();
            })
            .catch(done);
    });

    it('/POST', done => {
        request
            .post('/artists')
            .send(testPainter)
            .then(response => {
                const painter = response.body;
                assert.ok(painter._id);
                testPainter.__v = 0;
                testPainter._id = painter._id;
                done();
            })
            .catch(done);
    });

    it('/GET by id', done => {
        request
            .get(`/artists/${testPainter._id}`)
            .then(response => {
                const painter = response.body;
                assert.deepEqual(painter, testPainter);
                done()
            })
            .catch(done);
    });
});