const http = require('http');
const url = require('url');
const router = require('./router');

const HOST = '127.0.0.1';
const PORT = 8081;

const onEnd = function onEnd(pathname, response, data) {
  router.route(pathname, response, data);
}

const onRequest = function onRequest(request, response) {
  const pathname = url.parse(request.url).pathname;
  console.log('Request received for ' + pathname);
  var data = '';
  request.setEncoding('utf8');
  request.addListener('data', function onData(chunk) {
    data += chunk;
  });
  request.addListener('end', function () {
    onEnd(pathname, response, data); 
  });
}

const startServing = function startServing() {
  http.createServer(onRequest).listen(PORT, HOST);
  console.log('Server listening on ' + HOST + ':' + PORT);
}

module.exports.startServing = startServing;
