const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const GameChar = require('../models/gamechar');

router
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.name) query.name = req.query.name;
        GameChar.find(query)
            .then(gamechars => res.send(gamechars))
            .catch(next)
    })

    .get('/:id', (req, res, next) => {
        GameChar.findById(req.params.id)
            .then(gamechars => res.send(gamechars))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        GameChar.findByIdAndRemove(req.params.id)
            .then(gamechars => res.send(gamechars))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new GameChar(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        GameChar.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    });

    // .get(
    // TODO: add so that you serve up a web page, you can even use pug :)
    // )

module.exports = router;