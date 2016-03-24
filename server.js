const http = require('http');
const url = require('url');
const router = require('./router');

const HOST = '127.0.0.1';
const PORT = 8081;

const onRequest = function onRequest(request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log('Request received for ' + pathname);
  router.route(pathname, response);
}

const startServing = function startServing() {
  http.createServer(onRequest).listen(PORT, HOST);
  console.log('Server listening on ' + HOST + ':' + PORT);
}

module.exports.startServing = startServing;
