const express = require('express');
const riders = express.Router();
const Rider = require('../models/rider');
const bodyParser = require('body-parser').json();

riders.get('/', (req, res, next) => {
  const query = {};
  if (req.query.role) query.role = req.query.role;
  // console.log('in riders.get; query = ', query);
  Rider.find(query)
    .then((riders) => {
      // console.log('riders ', riders);
      res.send(riders); 
    })
    .catch(next);
});

riders.post('/', bodyParser, (req, res, next) => {
  new Rider(req.body).save()
    .then((saved_rider) => { res.send(saved_rider); })
    .catch(next);
});

riders.get('/:id', (req, res, next) => {
  Rider.findById(req.params.id)
    .then((rider) => { res.send(rider); })
    .catch(next);
});

module.exports = riders;