
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose-config');
const app = require('../lib/app');

describe('Validating Apartment Buildings', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'aptbldgs';
            connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const testAptBldg = {
        name: 'Test Apartment Building',
        location: 'random avenue',
        nbrunits: 20,
        vacantunits: 0
    };

    const testAptBldgUpd = {
        location: 'specific street',
        vacantunits: 3
    };

    const testAptBldgFinal = {
        name: 'Test Apartment Building',
        location: 'specific street',
        nbrunits: 20,
        vacantunits: 3
    };

    const request = chai.request(app);

    it('GET all ', done => {
        request
            .get('/api/aptbldgs')
            .then( res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POST request', done => {
        request
            .post('/api/aptbldgs')
            .send(testAptBldg)
            .then(res => {
                const aptBldg = res.body;
                assert.ok(aptBldg._id);
                testAptBldg._id = aptBldg._id;
                testAptBldg.__v = 0;
                testAptBldgFinal._id = aptBldg._id;
                testAptBldgFinal.__v = 0;
                done();
            })
            .catch(done);
    });

    it('GET by id', done => {
        request
            .get(`/api/aptbldgs/${testAptBldg._id}`)
            .then( res => {
                assert.deepEqual(res.body, testAptBldg);
                done();
            })
            .catch(done);
    });

    it('GET all after POST', done => {
        request
            .get('/api/aptbldgs')
            .then( res => {
                assert.deepEqual(res.body, [testAptBldg]);
                done();
            })
            .catch(done);
    });

    it('PUT request', done => {
        request
            .put(`/api/aptbldgs/${testAptBldg._id}`)
            .send(testAptBldgUpd)
            .then(res => {
                assert.deepEqual(res.body, testAptBldg);
                done();
            })
            .catch(done);
    });

    it('DELETE request', done => {
        request
            .delete(`/api/aptbldgs/${testAptBldg._id}`)
            .then(res => {
                assert.deepEqual(res.body, testAptBldgFinal);
                done();
            })
            .catch(done);
    });

});

