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
});