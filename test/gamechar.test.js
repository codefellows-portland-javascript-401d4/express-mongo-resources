const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Gamechar = require('../lib/models/gamechar');

describe('Checks that app properly routes for gamechars', () =>{

    it('Validates name, game, age, and attack Power', done => {
        const daffyDuck = new Gamechar({
            name: 'Daffy Duck',
            game: 'SpaceJam',
            age: 79,
            attackpower: 4
        });

        daffyDuck.validate(err => {
            if (err) done(err);
            else done();
        });    
    });
    
    it('Validates that the name is required', done =>{
        const missPiggy = new Gamechar({
            game: 'StageCraft',
            age: 19,
            attackpower: 14
        });

        missPiggy.validate(err => {
            assert.isOk(err, 'Name is required');
            done();
        });
    });
});