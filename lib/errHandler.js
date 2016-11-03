module.exports = function errorHandler(err, req, res, next) { //eslint-disable-line
  err.code = err.code || 500;
  err.error = err.code === 500 ? 'our server is having difficulties, sorry' : err.error;
  console.error(err);
  res.send(err);
  // res.write(JSON.stringify(err));
  // res.end();
};