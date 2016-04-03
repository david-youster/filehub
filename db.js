/**
* FileHub
*
* Copyright (c) 2016 David Youster
*
* Made available under the terms of the MIT license. See LICENSE.txt for more
* information.
*/

const mongo = require('mongodb');

const connectionURL = "mongodb://localhost:27017/filehub";

const client = mongo.MongoClient;

function saveUploadData(uploadData) {
  client.connect(connectionURL, function (error, db) {
    onInsert(error, db, uploadData);
  }); 
}

function onInsert(error, db, data) {
  if (error) {
    console.error(error);
  } else {
    db.collection('uploads').insert(data);
    db.close();
  }
}

function getUploads(response, onRender) {
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').find().toArray(function (error, uploads) {
      onUploadsArray(error, uploads, response, onRender);
    });
  });
}

function onUploadsArray(error, uploads, response, onRender) {
  if (error) {
    console.error(error);
  } else {
    uploads = uploads.map(extractDataFromDBRecord);
    onRender(response, {uploads: uploads});
  }
}

function extractDataFromDBRecord(record) {
  return {
    id: record._id.toString(),
    name: record.name,
    path: record.path
  };
}

function getFile(response, fileID, onFile) {
  client.connect(connectionURL, function (error, db) {
    const query = {_id: new mongo.ObjectID(fileID)};
    db.collection('uploads').findOne(query, function (error, record) {
      onFindUpload(error, record, response, onFile);
    });
  });
}

function onFindUpload(error, record, response, onFile) {
  if (error) {
    console.error(error);
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 File not found.');
  } else if (record) {
    console.log('Retrieving: ' + record._id);
    onFile(response, record);
  }
}

function deleteFile(response, fileID, onDeleteFile) {
  const query = {_id: new mongo.ObjectID(fileID)}
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').findOne(query, function (error, record) {
      onFileForDeletion(error, record, response, onDeleteFile);
    });
  });
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').deleteOne(query);
  });
}

function onFileForDeletion(error, record, response, onDeleteFile) {
  if (error) {
    console.error(error);
  } else if (record) {
    onDeleteFile(response, record.path);
  }
}

module.exports.saveUploadData = saveUploadData;
module.exports.getUploads = getUploads;
module.exports.getFile = getFile;
module.exports.deleteFile = deleteFile;
