const swig = require('swig');
const formidable = require('formidable');
const util = require('util');

function index(response) {
  const template = swig.compileFile('./templates/index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(template());
  response.end();

}

function upload(response, request) {
  console.log('Handling form data...');
  const form = new formidable.IncomingForm();
  form.uploadDir = './uploads';
  form.parse(request);
  response.writeHead(302, {'Location': '/'});
  response.end();
}

function status404(response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('404 Not Found');
  response.end();
}

module.exports.index = index;
module.exports.upload = upload;
module.exports.status404 = status404;