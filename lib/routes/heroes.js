'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('../body-parser')();
const Hero = require('../models/hero');

router
    .get('/', (req, res, next) => {
        const query = {};

        Hero.find(query)
            .then(heroes => res.send(heroes))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Hero.findById(req.params.id)
        .then(heroes => res.send(heroes))
        .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Hero(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);

    })

    .put('/:id', bodyParser, (req, res, next) => {
        Hero.findByIdAndUpdate(req.params.id, req.body)
        .then(saved => res.send(saved))
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Hero.findByIdAndRemove(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(next);
    })

module.exports = router;