const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);
const dbConnection = require('../lib/mongoose');
const app = require('../lib/app');

describe('city', () => {
    before(done => {
        const CONNECTED = 1;
        if(dbConnection.readyState === CONNECTED) {
            dropCollection();
        } else {
            dbConnection.on('open', dropCollection);
        }

        function dropCollection() {
            const name = 'cities';
            dbConnection.db
                .listCollections({name})
                .next((err, collinfo) => {
                    if(!collinfo) return done();
                    dbConnection.db.dropCollection(name, done);
                });
        }
    });

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
                assert.ok(city._id);
                assert.equal(city.name, yek.name);
                yek.__v = 0;
                yek._id = city._id;
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
                assert.ok(city._id);
                assert.equal(city.name, yar.name);
                yar.__v = 0;
                yar._id = city._id;
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

    it('changes population with PUT', done => {
        const updateYar = JSON.stringify({name: 'Yaroslavl', region: 'Central', population: 600000});
        req
            .put(`/cities/${yar._id}`)
            .send(updateYar)
            .then(res => {
                console.log(yar.population);
                console.log(res.body.population);
                assert.equal(res.body.population, yar.population);
                done();
            })
            .catch(done);
    });

    it('DELETE by id', done => {
        req
            .del(`/cities/${yar._id}`)
            .then(res => {
                console.log(yar.population);
                expect(res).status(200);
                done();
            })
            .catch(done);
    });
    
});