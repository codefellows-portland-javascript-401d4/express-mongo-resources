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

    if (req.query.rank) query.rank = req.query.rank;

    Note.find(query)
      .then(notes => resHandler)
  });