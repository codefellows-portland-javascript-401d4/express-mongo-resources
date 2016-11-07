const Team = require('../lib/models/team');
const assert = require('chai').assert;

describe('Team model', () => {
    it('validate team name', done => {
        const team = new Team ({
            teamName: 'teamName'
        });

        team.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    if('teamName is required', done => {
        const team = new Team ();
        
    })
})