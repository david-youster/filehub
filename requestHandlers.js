const swig = require('swig');
const querystring = require('querystring');

function index(response, data) {
  const template = swig.compileFile('./templates/index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(template());
  response.end();

}

function upload(response, data) {
  response.writeHead(302, {'Location': '/'});
  data = querystring.parse(data);
  console.log(data.name);
  console.log(data.text);
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