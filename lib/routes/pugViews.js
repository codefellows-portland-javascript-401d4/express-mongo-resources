const express = require('express');
const router = express.Router();


router
    .get('/view', (req, res, next) => {
        res.render('index', {
            title: Date.now(),
            message: 'This part of the site is served up with a pug template to allow the data'
        })
    //next();
});

module.exports = router;