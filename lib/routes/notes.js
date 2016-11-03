const express = require('express');
const bodyParser = require('body-parser').json();

const Note = require('../models/note');

const router = express.Router();

router
  //serves /notes directory list if GET req for '/notes'
  .get('/', (req, res, next) => {
    let query = {};

    Note.find(query)
      .then((data) => {
        if (data.length === 0) {
          res.send('There are no notes, add some!');
        }else{
          data.forEach((data) => {
            res.write(data['title']);
            res.write('/n');
          });
          res.end();
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  // serves /notes/title if GET for /notes/title
  .get('/:id', (req, res, next) => {
    let query = {};
    query.title = req.params.id;

    Note.findOne(query)
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
          res.write(data['title'] + '\n' + data['text']);
        }
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  })
  //writes new file to database
  .post('/:id', bodyParser, (req, res, next) => {
    new Note(req.body).save()
      .then(() => {
        res.write('Your file has been stashed!');
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  })
  //updates file in database
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
  //deletes file from database
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