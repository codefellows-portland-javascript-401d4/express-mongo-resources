const Team = require('../lib/models/team');
const Region = require('../lib/models/region');
const assert = require('chai').assert;

describe('Team model', () => {

  it('should validate with teamName, teamMembers, region, and tiWinner', done => {
    const team =  new Team ({
      teamName: 'team',
      teamMembers: [1,2,3,4,5],
      region: 'NA',
      tiWinner: true
    });

    team.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('should require a team name', done => {
    const team = new Team ({
      teamMembers: [1,2,3,4,5],
      tiWinner: false
    });

    team.validate(err => {
      assert.isOk(err, 'it should error');
      done();
    });
  });

  it('should coerce teamMembers to array', done => {
    const team = new Team ({
      teamName: 'no array team',
      teamMembers: '1,2,3,4,5',
      region: 'NA',
      tiWinner: true
    });

    team.validate(err => {
      assert.isArray(team.teamMembers);
      done();
    });
  });
});

describe('Region model', () => {

  it('should validate with region and teams', done => {
    const region = new Region ({
      region: 'SEA',
      teams: ['team 1, team 2, team 3']
    });

    region.validate(err => {
      assert.isOk(!err, 'do not expect an erro');
      done();
    });
  });

  it('should require a region', done => {
    const region = new Region ({
      teams: ['team 1, team 2, team 3']
    });

    region.validate(err => {
      assert.isOk(err, 'expect an error here');
      done();
    });
  });

  it('should coerce teams to an array', done => {
    const region = new Region ({
      region: 'NA',
      teams: 'team 1, team 2, team 3'
    });

    region.validate(err => {
      assert.isArray(region.teams, 'expect teams to be an array');
      done();
    });
  });

});