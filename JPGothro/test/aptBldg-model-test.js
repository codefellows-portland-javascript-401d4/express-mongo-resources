// Testing the Apartment Unit Model
const AptBldg = require('../lib/models/aptBldg');
const assert = require('chai').assert;

describe('Validate AptBldg model', () => {
    it('Validation with all properties', done => {
        const newAptBldg = new AptBldg({
            name: 'Test Apt Bldg',
            location: 'Random Street',
            nbrunits: 20,
            vacantunits: 0
        });

        newAptBldg.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation with no name', done => {
        const newAptBldg = new AptBldg({
            location: 'Random Street',
            nbrunits: 20,
            vacantunits: 0
        });

        newAptBldg.validate(err => {
            assert.isOk(err, 'name should be required');
            done();
        });
    });

    it('Validation with non-numeric number of units', done => {
        const newAptBldg = new AptBldg({
            name: 'Test Building',
            location: 'Random Street',
            nbrunits: 'non-numeric',
            vacantunits: 0
        });

        newAptBldg.validate(err => {
            assert.isOk(err, 'number of units should be numeric');
            done();
        });
    });

    it('Validation with zero number of units', done => {
        const newAptBldg = new AptBldg({
            name: 'Test Building',
            location: 'Random Street',
            nbrunits: 0,
            vacantunits: 0
        });

        newAptBldg.validate(err => {
            assert.isOk(err, 'number of units should be greater than zero');
            done();
        });
    });

    it('Validation with negative number of units', done => {
        const newAptBldg = new AptBldg({
            name: 'Test Building',
            location: 'Random Street',
            nbrunits: -3,
            vacantunits: 0
        });

        newAptBldg.validate(err => {
            assert.isOk(err, 'number of units should be greater than zero');
            done();
        });
    });

    it('Validation of number of vacant units', done => {
        const newAptBldg = new AptBldg({
            name: 'Test Building',
            location: 'Random Street',
            nbrunits: 10,
            vacantunits: 'non-numeric'
        });

        newAptBldg.validate(err => {
            assert.isOk(err, 'number of vacant units must be numeric');
            done();
        });
    });

    it('Validation of negative number of vacant units', done => {
        const newAptBldg = new AptBldg({
            name: 'Test Building',
            location: 'Random Street',
            nbrunits: 10,
            vacantunits: -2
        });

        newAptBldg.validate(err => {
            assert.isOk(err, 'number of vacant units must not be negative');
            done();
        });
    });

    // The below tests are for validating if the number of vacant units is
    // less than or equal to the number of units. BUT, only if that is a
    // validation within the schema. Currently, it is not.
    
    // it('Validation of number of vacant units - part two', done => {
    //     const newAptBldg = new AptBldg({
    //         name: 'Test Building',
    //         location: 'Random Street',
    //         nbrunits: 10,
    //         vacantunits: 11
    //     });

    //     newAptBldg.validate(err => {
    //         assert.isOk(err, 'number of vacant units cannot be greater than number of units');
    //         done();
    //     });
    // });

    // it('Validation of number of vacant units - part three', done => {
    //     const aptUnit = new AptBldg({
    //         name: 'Test Building',
    //         location: 'Random Street',
    //         nbrunits: 10,
    //         vacantunits: 10
    //     });

    //     aptUnit.validate(err => {
    //         assert.isNotOk(err, 'number of vacant units should be less than or equal to number of units');
    //         done();
    //     });
    // });

});
