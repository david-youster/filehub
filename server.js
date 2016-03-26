const http = require('http');
const url = require('url');
const os = require('os');
const router = require('./router');

const HOST = '0.0.0.0';
const PORT = 8081;

function onRequest(request, response) {
  const pathname = url.parse(request.url).pathname;
  console.log(request.connection.remoteAddress + ' requested ' + pathname);
  router.route(pathname, response, request);
}

function startServing() {
  http.createServer(onRequest).listen(PORT, HOST);
  console.log('Server listening on ' + getNetworkIP() + ':' + PORT);
}

function getNetworkIP() {
  return os.networkInterfaces().wlan0[0].address;
}

module.exports.startServing = startServing;
