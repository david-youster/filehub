const http = require('http');

const HOST = '127.0.0.1';
const PORT = 8081;

const onRequest = function onRequest(request, response) {
  console.log('Request received');
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello from server!\n');
  response.end();
}

const startServing = function startServing() {
  http.createServer(onRequest).listen(PORT, HOST);
  console.log('Server listening on ' + HOST + ':' + PORT);
}

module.exports.startServing = startServing;
