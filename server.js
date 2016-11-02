/** Created by Gloria Anholt on 11/2/16. **/

const http = require('http');
const app = require('./lib/app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, err => {
  if (err) {
    console.error('Error starting the server: ', err);
  } else {
    console.log('Server listening on port ', port);
  }
});