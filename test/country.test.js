const Country = require('../lib/models/city');
const assert = require('chai').assert;

describe('Country model', () => {

    it('validates with name, religion, and degree of American', done => {
        const country = new Country({
            name: 'Blahblahkia',
            religions: ['Mammon'],
            freedom: true
        });

        country.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('requires name', done => {
        const country = new Country({
            religions: ['Satanism'],
            freedom: true
        });

        country.validate(err => {
            assert.isOk(err, 'name not present');
            done();
        });
    });

    it('religions is an array', done => {
        const country = new Country({
            name: 'Stanistan',
            religions: [5]
        });

        country.validate(err => {
            assert.isOk(err, 'religions is not an array');
            done();
        });
    });

    it('requires freedom to be a Boolean', done => {
        const country = new Country({
            name: 'Hebetude',
            freedom: 'no'
        });

        country.validate(err => {
            assert.isOk(err, 'freedom is neither a choice or a Boolean');
            done();
        });
    });
});