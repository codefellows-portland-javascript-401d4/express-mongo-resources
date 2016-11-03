const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const GameMap = require('../models/gamemap');

router
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.name) query.name = req.query.name;
        GameMap.find(query)
            .then(gamemaps => res.send(gamemaps))
            .catch(next)
    })

    .get('/:id', (req, res, next) => {
        GameMap.findById(req.params.id)
            .then(gamemaps => res.send(gamemaps))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        GameMap.findByIdAndRemove(req.params.id)
            .then(gamemaps => res.send(gamemaps))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new GameMap(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        GameMap.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;