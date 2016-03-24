const index = function index(response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('The index page');
  response.end();
}

const upload = function upload(response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('The upload page');
  response.end();
}

const status404 = function status404(response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('404 Not Found');
  response.end();
}

module.exports.index = index;
module.exports.upload = upload;
module.exports.status404 = status404;