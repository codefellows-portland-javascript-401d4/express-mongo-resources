/** Created by Gloria Anholt on 11/2/16. **/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Beer = require('../models/beer');


router
  .get('/', (req, res, next) => {
    Beer.find()
      .then((results) => {
        res.send(results);
      })
      .catch((err) => { console.error('you got an error: ', err); });
  })
  .get('/:name', (req, res, next) => {
    Beer.findOne({ "name": req.params.name })
      .then((results) => {
        console.log('find results were', results);
        res.send(results);
      })
      .catch((err) => { console.error('you got an error: ', err); });
  })
  // .put('/:name', bodyParser, (req, res, next) => {
  //   Beer.findByIdAndUpdate()
  //     .then()
  //     .catch();
  // })
  .post('/', bodyParser, (req, res, next) => {
    const brewery = new Beer(req.body);
    brewery.save()
      .then(res.send(`${brewery.name} added!`))
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .delete('/:name', (req, res, next) => {
    Beer.remove({ "name": req.params.name })
      .then(res.send(`${req.params.name} removed.`))
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  });

module.exports = router;