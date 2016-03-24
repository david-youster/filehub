const http = require('http');
const url = require('url');
const router = require('./router');

const HOST = '127.0.0.1';
const PORT = 8081;

const data = {
  post: '',
  pathname: '',
  response: null
}

const onData = function onData(chunk) {
  console.log('Received POST data chunk (' + chunk + ')...');
  data.post += chunk;
}

const onEnd = function onEnd() {
  router.route(data.pathname, data.response)
  data.post = '';
  data.pathname = '';
  data.response = null;
}

const onRequest = function onRequest(request, response) {
  data.pathname = url.parse(request.url).pathname;
  data.response = response;
  console.log('Request received for ' + data.pathname);
  request.addListener('data', onData);
  request.addListener('end', onEnd);
}

const startServing = function startServing() {
  http.createServer(onRequest).listen(PORT, HOST);
  console.log('Server listening on ' + HOST + ':' + PORT);
}

module.exports.startServing = startServing;
