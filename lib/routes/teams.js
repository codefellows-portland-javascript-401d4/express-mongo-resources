const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Team = require('../models/team');

router
 //all teams sorted by wins
    .get('/winsLeaders', (req, res, next) => {
      Team.find({}).sort('-wins')
                .then(teams => res.send(teams ))
                .catch(next);
    })

    .get('/', (req, res, next) => {
        // by itself, {} will return all Teams
      const query = {};

        // if we have a league to query on, add that property
        // (which will filter on teams that have that league)
        // e.g. "?American"
      if(req.query.league) query.league = req.query.league;

      Team.find(query)
            .then(teams => res.send(teams ))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
      Team.findById(req.params.id)
            .then(team => res.send(team ))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
      Team.removeById(req.params.id)
            .then(deleted => res.send(deleted ))
            .catch(next);
    })
    //JSON data - not an array!
    .post('/', bodyParser, (req, res, next) => {
      new Team(req.body).save()
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
      Team.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;