module.exports = function bodyReader(req, res, next) {
  let body ='';

  req.on('data', data => {
    body += data;
  });

  req.on('end', () => {
    try {
      req.body = JSON.parse(body);
      next();
    }
    catch(err) {
      next({code: 400, message: 'Bad request'});
    }
  });
};