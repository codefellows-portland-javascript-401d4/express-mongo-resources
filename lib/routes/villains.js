'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('../body-parser')();
const Villain = require('../models/villain');

router
    .get('/', (req, res, next) => {
        const query = {};

        Villain.find(query)
        .then(villains => res.send(villains))
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Villain.findById(req.params.id)
        .then(villains => res.send(villains))
        .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Villain(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);

    })

    .put('/:id', bodyParser, (req, res, next) => {
        Villain.findByIdAndUpdate(req.params.id, req.body)
        .then(saved => res.send(saved))
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Villain.findByIdAndRemove(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(next);
    });

module.exports = router;