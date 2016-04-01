const swig = require('swig');
const formidable = require('formidable');
const util = require('util');
const fs = require('fs');
const db = require('./db');

function index(response) {
  db.getUploads(response, onIndexPageRequested);
}

function onIndexPageRequested(response, templateLocals) {
  const template = swig.compileFile('./templates/index.html');
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(template(templateLocals));
  response.end();
}

function upload(response, request) {
  const form = new formidable.IncomingForm();
  form.uploadDir = './uploads';
  form.parse(request, onUpload);
  response.writeHead(302, {'Location': '/'});
  response.end();
}

function onUpload(error, fields, files) {
  if (error) {
    console.error(error);
    return;
  }
  const data = extractFileDataForDB(files.file);
  console.log(util.inspect(fields));
  db.saveUploadData(data);
}

function extractFileDataForDB(file) {
  return {
    name: file.name,
    path: file.path
  };
}

function getFile(response, request, query) {
  db.getFile(response, query.id, onFileRequested);
}

function onFileRequested(response, file) {
  console.log('Sending file ' + file.path);
  fs.createReadStream(file.path).pipe(response);
}

function deleteFile(response, request, query) {
  db.deleteFile(response, query.id, onDeleteFile);
}

function onDeleteFile(response, path) {
  console.log('Deleting file ' + path + ' from filesystem...');
  fs.unlink(path);
  response.writeHead(302, {'Location': '/'});
  response.end();
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
module.exports.deleteFile = deleteFile;
module.exports.serveStaticFile = serveStaticFile;
module.exports.status404 = status404;