/** Created by Gloria Anholt on 11/2/16. **/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Coffee = require('../models/coffee');


router
  .get('/', (req, res, next) => {
    Coffee.find()
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .get('/:name', (req, res, next) => {
    Coffee.findOne({ 'name': req.params.name })
      .then((results) => {
        console.log('find results were', results);
        res.send(results);
      })
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .put('/:name', bodyParser, (req, res, next) => {
    Coffee.findOneAndUpdate(
      { 'name': req.params.name },
      req.body,
      { 'upsert': true, 'runValidators': true, 'setDefaultsOnInsert': true })
      .then(res.send(`${req.params.name} updated.`))
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .post('/', bodyParser, (req, res, next) => {
    const coffeeShop = new Coffee(req.body);
    coffeeShop.save()
      .then(res.send(`${coffeeShop.name} added!`))
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .delete('/:name', (req, res, next) => {
    Coffee.remove({ 'name': req.params.name })
      .then(res.send(`${req.params.name} removed.`))
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  });

module.exports = router;