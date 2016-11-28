const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);
require('../lib/mongoose');
const app = require('../lib/app');

describe('city', () => {
    const req = chai.request(app);

    const yek = {
        name: 'Yekaterinburg',
        region: 'Siberia',
        population: 1350000
    };

    it('GET empty array before POST', done => {
        req
            .get('/cities')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POST a city', done => {
        req
            .post('/cities')
            .send(yek)
            .then(res => {
                const city = res.body;
                yek.__v = 0;
                yek._id = city._id;
                assert.deepEqual(city, yek);
                done();
            })
            .catch(done);
    });

    it('GET by id', done => {
        req
            .get(`/cities/${yek._id}`)
            .then(res => {
                const city = res.body;
                assert.deepEqual(city, yek);
                done();
            })
            .catch(done);
    });

    const yar = {
        name: 'Yaroslavl',
        region: 'Central',
        population: 590000
    };

    it('POST non-Siberian city', done => {
        req
            .post('/cities')
            .send(yar)
            .then(res => {
                const city = res.body;
                yar.__v = 0;
                yar._id = city._id;
                assert.deepEqual(city, yar);
                done();
            })
            .catch(done);
    });

    it('GET all after POST', done => {
        req
            .get('/cities')
            .then(res => {
                assert.deepEqual(res.body, [yek, yar]);
                done();
            })
            .catch();
    });

    it('GET Siberian cities', done => {
        req
            .get('/cities')
            .query({region: 'Siberia'})
            .then(res => {
                assert.deepEqual(res.body, [yek]);
                done();
            })
            .catch(done);
    });

    it('GET cities with population below 1 million', done => {
        req
            .get('/cities/small')
            .then(res => {
                assert.equal(res.body, 1);
                done();
            })
            .catch();
    });

    const updateYar = {name: 'Yaroslavl', region: 'Central', population: 600000};

    it('changes population with PUT', done => {
        req
            .put(`/cities/${yar._id}`)
            .send(updateYar)
            .then(res => {
                assert.equal(res.body.population, updateYar.population);
                done();
            })
            .catch(done);
    });

    it('DELETE by id', done => {
        req
            .del(`/cities/${yar._id}`)
            .then(res => {
                yar.population = 600000;
                assert.deepEqual(res.body, yar);
                expect(res).status(200);
                done();
            })
            .catch(done);
    });

    it('DELETE all', done => {
        req
            .del('/cities')
            .then(res => {
                expect(res).status(200);
                done();
            })
            .catch(done);
    });
    
});