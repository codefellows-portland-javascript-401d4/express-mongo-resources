const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Country = require('../models/country');

router
    .get('/', (req, res, next) => {
        let query = {};
        if(req.query) {
            query = req.query;
        }
        Country.find(query)
            .then(countries => {
                res.send(countries);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        let id = req.params.id;
        Country.findById(id)
            .then(country => res.send(country))
            .catch(next);
    })

    .delete('/', (req, res, next) => {
        Country.remove({})
            .then( deleted => res.send(deleted))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        let id = req.params.id;
        Country.findByIdAndRemove(id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        let body = req.body;
        new Country(body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
        let id = req.params.id;
        let body = req.body;
        Country.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(changed => res.send(changed))
            .catch(next);
    });

module.exports = router;