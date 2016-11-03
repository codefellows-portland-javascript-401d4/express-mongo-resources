const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const City = require('../models/city');

router
    .get('/', (req, res, next) => {
        let query = {};
        if(req.query) {
            query = req.query;
        }
        City.find(query)
            .then(cities => {
                res.send(cities);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        let id = req.params.id;
        City.findById(id)
            .then(city => res.send(city))
            .catch(next);
    })

    .delete('/', (req, res, next) => {
        City.remove({})
            .then( deleted => res.send(deleted))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        let id = req.params.id;
        City.findByIdAndRemove(id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        let body = req.body;
        new City(body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
        let id = req.params.id;
        let body = req.body;
        City.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(changed => {res.send(changed); console.log(changed);})
            .catch(next);
    });

module.exports = router;