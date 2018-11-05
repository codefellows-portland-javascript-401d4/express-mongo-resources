'use strict';
const Villain = require('../lib/models/villain');
const assert = require('chai').assert;

describe('Villain model', () => {

    it('validates with name', done => {
        const villain = new Villain({
            name: 'Dr Evil'
        });

        villain.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('requires name', done => {
        const villain = new Villain({
            univserse: 'Marvel'
        });

        villain.validate(err => {
            assert.isOk(err, 'name should have been required');
            done();
        });
    });

});