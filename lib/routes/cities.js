const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const City = require('../models/city');

router
    .get('/', (req, res, next) => {
        City.find()
            .then(cities => {
                if (cities.length === 0) {
                    res.send('There are no cities listed.');
                } else {
                    res.send(`Here are all available cities:\n\n${cities}`);
                }
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        let id = req.params.id;
        City.findById(id)
            .then(city => res.send(`Here is the data for ${city.name}:\n\n${city}`))
            .catch(next);
    })

    .delete('/', (req, res, next) => {
        City.remove({})
            .then( () => res.send('Removed all documents.'))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        let id = req.params.id;
        City.findByIdAndRemove(id)
            .then(deleted => res.send(`Removed ${deleted.name}.`))
            .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        let body = req.body;
        new City(body).save()
            .then(saved => res.send(`Saved ${saved.name}:\n\n${saved}.`))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
        let id = req.params.id;
        let body = req.body;
        City.findByIdAndUpdate(id, body)
            .then(changed => res.send(`Altered ${changed.name}. It is now:\n\n${changed}.`)) //add previous obj for comparison
            .catch(next);
    });

module.exports = router;