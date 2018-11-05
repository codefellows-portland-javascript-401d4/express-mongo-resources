const express = require('express');
const router = express.Router();
const bodyReader = require('../bodyReader');
const Region = require('../models/region');

router
  .get('/:region', (req, res, next) => {
    const query = {};
    query.region = req.params.region;
    Region.find(query)
      .then(region => {
        var tiWinners = 0;
        region[0].teams.forEach(team => {
          switch (team) {
          case 'Evil Geniuses':
            tiWinners ++;
            break;
          case 'Natus Vincere':
            tiWinners ++;
            break;
          case 'Invictus Gaming':
            tiWinners ++;
            break;
          case 'Alliance':
            tiWinners ++;
            break;
          case 'Newbee':
            tiWinners ++;
            break;
          case 'Wings Gaming':
            tiWinners ++;
            break;

          }
        });
        res.send(`This region has ${tiWinners} TI winning teams`);
      })
        .catch(() => next({code: 400, message: 'Bad request'}));
  });

module.exports = router;