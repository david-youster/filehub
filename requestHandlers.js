const swig = require('swig');

const index = function index(response, data) {
  const template = swig.compileFile('./templates/index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(template());
  response.end();

}

const upload = function upload(response, data) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(data.name.toString() + '\n');
  response.write(data.text.toString() + '\n');
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