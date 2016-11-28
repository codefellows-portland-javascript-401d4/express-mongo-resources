const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);
require('../lib/mongoose');
const app = require('../lib/app');

describe('country', () => {
    const req = chai.request(app);

    const azer = {
        name: 'Azerbaijan',
        religions: ['Islam'],
        freedom: false
    };

    it('GET empty array before POST', done => {
        req
            .get('/countries')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POST a country', done => {
        req
            .post('/countries')
            .send(azer)
            .then(res => {
                const country = res.body;
                azer.__v = 0;
                azer._id = country._id;
                assert.deepEqual(country, azer);
                done();
            })
            .catch(done);
    });

    it('GET by id', done => {
        req
            .get(`/countries/${azer._id}`)
            .then(res => {
                const country = res.body;
                assert.deepEqual(country, azer);
                done();
            })
            .catch(done);
    });

    const arm = {
        name: 'Armenia',
        religions: ['Christianity'],
        freedom: true
    };

    it('POST Azerbaijan\'s nemesis', done => {
        req
            .post('/countries')
            .send(arm)
            .then(res => {
                const country = res.body;
                arm.__v = 0;
                arm._id = country._id;
                assert.deepEqual(country, arm);
                done();
            })
            .catch(done);
    });

    it('GET all after POST', done => {
        req
            .get('/countries')
            .then(res => {
                assert.deepEqual(res.body, [azer, arm]);
                done();
            })
            .catch(done);
    });

    it('GET Muslim countries', done => {
        req
            .get('/countries')
            .query({religions: 'Islam'})
            .then(res => {
                assert.deepEqual(res.body, [azer]);
                done();
            })
            .catch(done);
    });

    const updateArm = {name: 'Armenia', religions: 'Christianity', freedom: false};

    it('communism with PUT', done => {
        req
            .put(`/countries/${arm._id}`)
            .send(updateArm)
            .then(res => {
                assert.equal(res.body.freedom, updateArm.freedom);
                done();
            })
            .catch(done);
    });

    it('DELETE by id', done => {
        req
            .del(`/countries/${arm._id}`)
            .then(res => {
                arm.freedom = false;
                assert.deepEqual(res.body, arm);
                expect(res).status(200);
                done();
            })
            .catch(done);
    });

    it('DELETE all', done => {
        req
            .del('/countries')
            .then(res => {
                expect(res).status(200);
                done();
            })
            .catch(done);
    });
    
});