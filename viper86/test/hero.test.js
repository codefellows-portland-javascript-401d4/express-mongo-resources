'use strict';
const Hero = require('../lib/models/hero');
const assert = require('chai').assert;

describe('Hero model', () => {

    it('validates with name', done => {
        const hero = new Hero({
            name: 'Austin Powers'
        });

        hero.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('requires name', done => {
        const hero = new Hero({
            univserse: 'Marvel'
        });

        hero.validate(err => {
            assert.isOk(err, 'name should have been required');
            done();
        });
    });

    it('validates that anti_hero is boolean', done => {
        const hero = new Hero({
            name: 'Ant-Man',
            anti_hero: false
        });

        hero.validate(() => {
            assert.equal(typeof hero.anti_hero, 'boolean');
            done();
        });
    });

});