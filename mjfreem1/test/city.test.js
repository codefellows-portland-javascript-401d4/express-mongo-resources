const City = require('../lib/models/city');
const assert = require('chai').assert;

describe('City model', () => {

    it('validates with name, region, and population', done => {
        const city = new City({
            name: 'Tootsville',
            region: 'Tootsylvania',
            population: 1
        });

        city.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('requires name', done => {
        const city = new City({
            region: 'Dedede',
            population: 2
        });

        city.validate(err => {
            assert.isOk(err, 'name not present');
            done();
        });
    });

    it('defaults to "Parts Unknown" for region', done => {
        const city = new City({
            name: 'Quesadilla'
        });

        city.validate(err => {
            assert.isNotOk(err);
            assert.equal(city.region, 'Parts Unknown');
            done();
        });
    });

    it('requires population to be a number', done => {
        const city = new City({
            name: 'Hebetude',
            population: 'five'
        });

        city.validate(err => {
            assert.isOk(err, 'population is not a number');
            done();
        });
    });
});