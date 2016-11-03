const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Gamemap = require('../lib/models/gamemap');

describe('Checks that app properly routes for gamemaps', () => {
    
    it('Validates name, environment, size, and unitOfMeasure', done => {
        const mushroomKingdom = new Gamemap({
            name: 'Mushroom Kingdom',
            environment: 'temperate',
            size: 1000000,
            unitOfMeasure: 'cubits'
        });

        mushroomKingdom.validate(err => {
            if (err) done(err);
            else done();
        });
    });

    it('Validates you can leave out unitOfMeasure as an entry', done => {
        const eberron = new Gamemap({
            name: 'Eberron',
            environment: 'jungle',
            size: 1000000000,
        });

        eberron.validate(err => {
            if (err) done(err);
            else done();
        });
    });

    it('Validates that environment is required', done => {
        const darkSun = new Gamemap({
            name: 'Athas',
            size: 1000000000,
        });

        darkSun.validate(err => {
            assert.isOk(err, 'should produce ')
            done();
        });
    });

});