const express = require('express');
const bodyParser = require('body-parser').json();
const router = express.Router();
const Dog = require('../models/dog-schema');

router
  .get('/', (req, res, next) => {
    Dog.find()
      .then(dog => res.send(dog))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Dog.findById(req.params.id)
      .then(dog => res.send(dog))
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    new Dog(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
    Dog.findByIdAndUpdate(req.params.id)
      .then(saved => res.send(saved))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Dog.removedById(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });

module.exports = router;
