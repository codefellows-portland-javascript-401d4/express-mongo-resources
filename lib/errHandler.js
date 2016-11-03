const resHandler = require('./resHandler');

module.exports = function errorHandler(err, req, res, next) { //eslint-disable-line
  console.log(res.status, err);
  resHandler.errHandler(res);
};