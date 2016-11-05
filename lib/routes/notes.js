const express = require('express');
const bodyParser = require('body-parser').json();

const Note = require('../models/note');

const router = express.Router();

router
  //serves /notes directory list if GET req for '/notes'
  .get('/', (req, res, next) => {
    Note.find()
      .then((data) => {
        if (data.length === 0) {
          res.send({message:'There are no notes, add some!'});
        }else{
          res.send(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  // serves specific note if GET for specific id
  .get('/:id', (req, res, next) => {
    let query = req.params.id;

    Note.findById(query)
      .then((data) => {
        let mistake = {};
        //if note does not exist
        if (!data) {
          mistake.code = 404;
          mistake.error = 'That note does not exist. Perhaps you meant to create a new note?';
          next(mistake);
        //if note is empty of text
        }else if (data && !data['text']) {
          let mistake = {code: 405, error: 'That note exists but is empty. Perhaps you meant to update that note?'};
          next(mistake);
        }else{
          res.send({message: 'Your note has been found', data: data});
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  //serves all notes with a specific property value
  .get('/search/:prop/:val', (req, res, next) => {
    Note.find({[req.params.prop]: req.params.val})
      .then((data) => {
        res.send({message: 'Your notes have been found', data: data});
      })
      .catch((err) => {
        next(err);
      });
  })
  //writes new note to database
  .post('/', bodyParser, (req, res, next) => {
    new Note(req.body).save()
      .then((data) => {
        res.send({message: 'Your note has been stashed', data: data});
      })
      .catch((err) => {
        next(err);
      });
  })
  //updates note in database
  .put('/:id', bodyParser, (req, res, next) => {
    Note.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
      .then((data) => {
        res.send({message: 'Your note has been updated', data: data});
      })
      .catch((err) => {
        next(err);
      });
  })
  //deletes note from database
  .delete('/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
      .then((data) => {
        res.send({message: 'Your note has been deleted', data: data});
      })
      .catch((err) => {
        let mistake = {};
        if (err.value === 'nofile') {
          mistake.code = 404;
          mistake.error = 'That note does not exist. Perhaps you meant to create a new note?';
        }else{
          mistake.code = 500;
        }
        next(mistake);
      });
    // }
  })
  //find last five updated notes
  .get('/last5/notes', (req, res, next) => {
    Note.find().sort({updatedAt:-1}).limit(5)
    .then((data) => {
      res.send({message:'Here are the last five updated notes.', data: data});
    })
    .catch((err) => {
      next(err);
    });
  });

module.exports = router;