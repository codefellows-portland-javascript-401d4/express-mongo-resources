const express = require('express');
const bodyParser = require('body-parser').json();
const router = express.Router();
const Cat = require('../models/cat-schema');

router
  .get('/', (req, res, next) => {
    const query = {};
    if(req.query.breed) {
      query.breed = req.query.breed;
    }
    if(req.query.color) {
      query.color = req.query.color;
    }
    if(req.query.gender) {
      query.gender = req.query.gender;
    }
    Cat.find(query)
      .then(cat => res.send(cat))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Cat.findById(req.params.id)
      .then(cat => res.send(cat))
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    new Cat(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
    Cat.findByIdAndUpdate(req.params.id)
      .then(saved => res.send(saved))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Cat.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });

module.exports = router;
