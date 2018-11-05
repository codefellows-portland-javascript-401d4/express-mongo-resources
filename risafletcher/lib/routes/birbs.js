const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Birbs = require('../models/birbs');

router

  .get('/', (req, res, next) => {
      const query = {};

      if(req.query.legs) query.legs = req.query.legs;

      Birbs.find(query)
      .then(birb => res.send(birb))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
      Birbs.findById(req.params.id)
      .then(birb => res.send(birb))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
      Birbs.removeById(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
      new Birbs(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req,res,next) => {
      Birbs.findByIdAndUpdate(req.params.id, req.body)
      .then(saved => res.send(saved))
      .catch(next);
  });

module.exports = router;