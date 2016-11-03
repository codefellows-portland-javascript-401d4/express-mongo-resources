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
    const query = {};

    if (req.query.title) query.title = req.query.title;

    //line from mongo or mongoose
    Note.find(query)
      .then((data) => {
        resHandler.writeDir(data, res);
      })
      .catch((err, data) => {
        (!data) ? res.status = 410 : res.status = 500;
        next(err);
      });
  });
  //serves /notes/filename if GET for

module.exports = router;