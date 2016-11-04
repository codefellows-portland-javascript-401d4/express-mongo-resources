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
  // serves /notes/title if GET for /notes/title
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
          res.write(data['title'] + '\n' + data['text'] + '\n' + data['tags']);
        }
        res.end();
      })
      .catch((err) => {
        console.log('in the catch get id', err);
        next(err);
      });
  })
  //writes new note to database
  .post('/:id', bodyParser, (req, res, next) => {
    new Note(req.body).save()
      .then((newNote) => {
        res.send({message: 'Your note has been stashed', data: newNote});
      })
      .catch((err) => {
        next(err);
      });
  })
  //updates note in database
  .put('/:id', bodyParser, (req, res, next) => {
    console.log(req.body);

    Note.findOneAndUpdate(req.body)
      .then(() => {
        res.write('Your file has been updated');
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  })
  //deletes note from database
  .delete('/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
      .then(() => {
        res.write('Your file has been deleted');
        res.end();
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
  });


module.exports = router;