'use strict';

module.exports = function createBodyParser() {

    return function bodyParser(req, res, next) {
        let body = '';
        req.on('data', data => {
            body += data;
            console.log('body', body);
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            next();
        });
    };
};