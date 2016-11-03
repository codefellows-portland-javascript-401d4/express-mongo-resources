const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Country = require('../models/country');

router
    .get('/', (req, res, next) => {
        Country.find()
            .then(countries => {
                if (countries.length === 0) {
                    res.send('There are no countries listed.');
                } else {
                    res.send(`Here are all available countries:\n\n${countries}`);
                }
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        let id = req.params.id;
        Country.findById(id)
            .then(country => res.send(`Here is the data for ${country.name}:\n\n${country}`))
            .catch(next);
    })

    .delete('/', (req, res, next) => {
        Country.remove({})
            .then( () => res.send('Removed all documents.'))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        let id = req.params.id;
        Country.findByIdAndRemove(id)
            .then(deleted => res.send(`Removed ${deleted.name}.`))
            .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        let body = req.body;
        new Country(body).save()
            .then(saved => res.send(`Saved ${saved.name}:\n\n${saved}.`))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
        let id = req.params.id;
        let body = req.body;
        Country.findByIdAndUpdate(id, body)
            .then(changed => res.send(`Altered ${changed.name}. It is now:\n\n${changed}.`)) //add previous obj for comparison
            .catch(next);
    });

module.exports = router;