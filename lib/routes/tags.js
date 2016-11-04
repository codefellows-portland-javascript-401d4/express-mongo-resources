const express = require('express');
const bodyParser = require('body-parser').json();

const Tag = require('../models/tag');

const router = express.Router();

router
  //serves /tags directory list if GET req for '/tags'
  .get('/', (req, res, next) => {
    let query = {};

    Tag.find(query)
      .then((data) => {
        if (data.length === 0) {
          res.send('There are no tags, add some!');
        }else{
          res.write('tag list');
          res.write('/n');
          data.forEach((data) => {
            res.write(data['name']);
            res.write('/n');
          });
          res.end();
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  // serves /tags/title if GET for /tags/title
  .get('/:id', (req, res, next) => {
    let query = req.params.id;

    Tag.findById(query)
      .then((data) => {
        let mistake = {};
        //if tag does not exist
        if (!data) {
          mistake.code = 404;
          mistake.error = 'That tag does not exist. Perhaps you meant to create a new tag?';
          next(mistake);
        //if tag is empty of description
        }else if (data && !data['description']) {
          let mistake = {code: 405, error: 'That tag exists but is empty. Perhaps you meant to update that tag?'};
          next(mistake);
        }else{
          res.send({message: 'Your tag has been found', data: data});
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  //writes new tag to database
  .post('/:id', bodyParser, (req, res, next) => {
    new Tag(req.body).save()
      .then((newTag) => {
        res.send({message: 'Your tag has been stashed', data: newTag});
      })
      .catch((err) => {
        next(err);
      });
  })
  //updates tag in database
  .put('/:id', bodyParser, (req, res, next) => {
    console.log(req.body);

    Tag.findOneAndUpdate(req.body)
      .then(() => {
        res.write('Your tag has been updated');
        res.end();
      })
      .catch((err) => {
        next(err);
      });
  })
  //deletes tag from database
  .delete('/:id', (req, res, next) => {
    Tag.findByIdAndRemove(req.params.id)
      .then(() => {
        res.write('Your tag has been deleted');
        res.end();
      })
      .catch((err) => {
        let mistake = {};
        if (err.value === 'nofile') {
          mistake.code = 404;
          mistake.error = 'That tag does not exist. Perhaps you meant to create a new tag?';
        }else{
          mistake.code = 500;
        }
        next(mistake);
      });
    // }
  });


module.exports = router;