/** Created by Gloria Anholt on 11/2/16. **/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Beer = require('../models/beer');


router
  .get('/', (req, res, next) => {
    console.log('you hit the / route');
    console.log('what is req?', req);
    Beer.find({}, (err, results) => {
      console.log('results: ', results);
    });
     // .then((results) => { console.log('you got a shop: ', results); })
      //.catch((err) => { console.error('you got an error: ', err); });
  });
  // .get('/:name', (req, res, next) => {
  //   Beer.findById(//name)
  //     .then()
  //     .catch();
  // })
  // .put('/:name', bodyParser, (req, res, next) => {
  //   Beer.findByIdAndUpdate(//name)
  //     .then()
  //     .catch();
  // })
  // .post('/', bodyParser, (req, res, next) => {
  //   Beer.save()
  //     .then()
  //     .catch();
  // })
  // .delete('/:name', (req, res, next) => {
  //   Beer.findByIdAndRemove()
  //     .then()
  // });

module.exports = router;