const express = require('express');
const router = express.Router();

// const bodyParser = require('body-parser').json();

const Team = require('../models/team');

router
    .get('/', (req, res, next) => {
        const query = {};
        Team.find(query)
            .then(teams => res.send(teams))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Team.findById(req.params.id)
            .then(team => res.send(team))
            .catch(next);




    });



module.exports = router;
