const express = require('express');
const router = express.Router();
const bodyReader = require('../bodyReader');
const Team = require('../models/team');

router
  .get('/', (req, res, next) => {
    const query = {};
    if (req.query.teamName) query.teamName = req.query.teamName;

    Team.find(query)
      .then(team => res.send(team))
      .catch(() => next({code: 400, message: 'Bad request'}));
  })

  .get('/:id', (req, res, next) => {
    Team.findById(req.params.id)
      .then(team => res.send(team))
      .catch(() => next({code: 404, message: 'resource not found'}));
  })
  
  .post('/', bodyReader, (req, res, next) => {
    new Team(req.body).save()
      .then(saved => res.send(saved))
      .catch(() => next({code: 400, message: 'Bad request'}));
  })

  .put('/:id', bodyReader, (req, res, next) => {
    Team.findById(req.params.id)
      .then(team => {
        team.update(req.body)
        .then(updated => res.send(updated))
        .catch(() => next({code:400, message: 'Bad request'}));
      })
      .catch(() => next({code: 404, message: 'Resource not found'}));
  })
  // .delete('/', (req, res, next) => {
  //   Team.remove()
  //     .then(res.send('bye db'))
  //     .catch(next);
  // })
  .delete('/:id', (req, res, next) => {
    Team.findByIdAndRemove(req.params.id)
      .then(deleted => {
        res.send(`Resource ${deleted.id} was deleted`);
      })
      .catch(() => next({code: 404, message: 'Resource not found'}));
  });

module.exports = router;