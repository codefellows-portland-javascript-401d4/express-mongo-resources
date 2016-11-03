const express = require('express');
const bodyParser = require('body-parser').json();

const resHandler = require('../resHandler');
const Note = require('../models/note');

const router = express.Router();

// // do i need these?
// const path = require('path');
// const filePath = path.join(__dirname, '../notes');

router
  //serves /notes directory list if GET req for '/notes'
  .get('/', (req, res, next) => {
    let query = {};
    // query.title = req.params.id;
    // if (req.query.title) query.title = req.query.title;

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
        res.statusCode = 500;
        next(err);
      });
  })
  // serves /notes/title if GET for /notes/title
  .get('/:id', (req, res, next) => {
    let query = {};
    query.title = req.params.id;

    Note.findOne(query)
      .then((data) => {
        //if no data in the note part
        if (!data['text']) {
          res.write('That note is empty. Perhaps you meant to update the note?');
        }else{
          res.write(data['title'] + '\n' + data['text']);
        }
        res.end();
      })
      .catch((err, data) => {
        (!data) ? res.status = 410 : res.status = 500;
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
        res.statusCode = 500;
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
        res.statusCode = 500;
        next(err);
      });
  })
  //deletes file from database
  .delete('/:id', (req, res, next) => {
    Note.remove(req.params.id)
      .then(() => {
        res.write('Your file has been deleted');
        res.end();
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 404;
        next(err);
      });
  });


module.exports = router;