const chai = require('chai');
const assert = chai.assert;
const Birbs = require('../lib/models/birbs');
const Cats = require('../lib/models/cats');

describe('Birb model', () => {
    it('validates with name, species, wingspan', done => {
        const birb = new Birbs({
            name: 'name',
            species: 'species',
            wingspan: 55
        });
        birb.validate(err => {
            if (!err) done();
            else done(err);
        });
    });
    // test passes because all required values are provided

    it('name is required', done => {
        const birb = new Birbs();
        birb.name = 'tom';

        birb.validate(err => {
            assert.isOk(err, 'name should have been required');
            done();
        });
    });
    // test passes because error is thrown

    it('asserts that wingspan must be a number', done => {
        const birb = new Birbs({
            name: 'name',
            species: 'species',
            wingspan: 'not a number'
        });

        birb.validate(err => {
            assert.isOk(err, 'expected wingspan to be a number');
            done();
        });
    });
    //test passes because wingspan is a string and expected error to be thrown

    it('species defaults to "Pigeon"', done => {
        const birb = new Birbs({
            name:'birb',
            wingspan: 55
        });

        birb.validate(err => {
            assert.isNotOk(err);
            assert.equal(birb.species, 'Pigeon');
            done();
        });
    });
});


describe('Cat model', () => {

    it('validates with name, color, legs', done => {
        const cat = new Cats({
            name: 'name',
            color: 'color',
            legs: 4
        });

        cat.validate(err => {
            if (err) return err;
            else done(err);
        });
    });
    //test passes because all requirements are being met

    it('color is required', done => {
        const cat = new Cats({
            name: 'name',
            legs: 3
        });

        cat.validate(err => {
            assert.isOk(err, 'you didn\'t give your cat a color!');
            done();
        });
    });
    //test passes beacuse color is missing and error is expected

    it('legs must be a number', done => {
        const cat = new Cats({
            name: 'name',
            color: 'color',
            legs: NaN
        });

        cat.validate(err => {
            assert.isOk(err, 'legs must be a number');
            done();
        });
    });
    //test passes because legs is NaN

    it('cannot have more than 4 legs', done => {
        const cat = new Cats({
            name: 'name',
            color: 'color',
            legs: 5
        });

        cat.validate(err => {
            assert.isOk(err, 'cannot have more than 4 legs');
            done();
        });
    });
    //test passes because legs is > 4

    it('name defaults to "Tom"', done => {
        const cat = new Cats({
            color: 'color',
            legs: 4
        });

        cat.validate(err => {
            assert.isNotOk(err),
            assert.equal(cat.name, 'Tom');
            done();
        });
    });
    //test passes because name defaults to Tom
});