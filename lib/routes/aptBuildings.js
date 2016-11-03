const express = require('express');
const router = express.Router();
const bodyReader = require('../bodyReader')();
const AptBldg = require('../models/aptBldg');

router 
    .get('/', (req, res, next) => {
        console.log('router GET all');
        const query = {};

        // if a query is passed, use it.
        // if(req.query.nbrunits) query.nbrunits = req.query.nbrunits;
        // if(req.query.name) query.name = req.query.name;

        AptBldg.find(query)
            .then(aptbldgs => res.send(aptbldgs))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        console.log('router GET one');
        AptBldg.findById(req.params.id)
        .then(aptbldg => res.send(aptbldg))
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        console.log('router DELETE');
        AptBldg.findByIdAndRemove(req.params.id)
        .then( removed => res.send(removed))
        .catch(next);
    })

    .post('/', bodyReader, (req, res, next) => {
        console.log('router POST');
        new AptBldg(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })

    .put('/:id', bodyReader, (req, res, next) => {
        console.log('router PUT');
        AptBldg.findByIdAndUpdate(req.params.id, req.body)
        .then(updated => res.send(updated))
        .catch(next);
    });

module.exports = router;

