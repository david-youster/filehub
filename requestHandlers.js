const swig = require('swig');
const formidable = require('formidable');
const util = require('util');
const fs = require('fs');
const db = require('./db');

function index(response) {
  db.getUploads(response, renderIndexPage);
}

function renderIndexPage(response, templateLocals) {
  const template = swig.compileFile('./templates/index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(template(templateLocals));
  response.end();
}

function upload(response, request) {
  const form = new formidable.IncomingForm();
  form.uploadDir = './uploads';
  form.parse(request, readUploadData);
  response.writeHead(302, {'Location': '/'});
  response.end();
}

function readUploadData(error, fields, files) {
  if (error) {
    console.error(error);
    return;
  }
  const data = extractFileData(files.file);
  console.log(util.inspect(fields));
  data.comment = fields['comment'];
  db.saveUploadData(data);
}

function extractFileData(file) {
  return {
    name: file.name,
    path: file.path
  };
}

function getFile(response, request, query) {
  db.getFile(response, query.id, sendFile);
}

function sendFile(response, file) {
  console.log('Sending file ' + file.path);
  fs.createReadStream(file.path).pipe(response);
}

function serveStaticFile(response, request, query) {
  console.log('Serving static file ' + query.file  + '...');
  fs.createReadStream('./static/' + query.file).pipe(response);
}

function status404(response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('404 Not Found');
  response.end();
}

module.exports.index = index;
module.exports.upload = upload;
module.exports.getFile = getFile;
module.exports.serveStaticFile = serveStaticFile;
module.exports.status404 = status404;