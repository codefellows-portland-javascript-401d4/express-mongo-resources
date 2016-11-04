const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Team = require('../models/team');

router
    .get('/', (req, res, next) => {
        const query = {};

        if(req.query.rank) query.conference = req.query.rank;

        Team.find(query)
            .then(teams => res.send(teams))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Team.findbyId(req.params.id)
            .then(team => res.send(pirate ))
            .catch(next);
    })

    .delete('/:id', (req,res, next) => {
        Team.removeById(req.params.id)
            .then(deleted => res.send(deleted ))
            .catch(next);
    })

    .post('/:id', bodyParser, (req, res, next) => {
        new Team(req.body).save()
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Team.findbyByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;