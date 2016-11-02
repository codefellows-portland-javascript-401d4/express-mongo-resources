const server = require('./server');
const port = process.env.PORT || 3333;

server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('http server listening on port', port);
});

