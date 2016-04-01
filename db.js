const mongo = require('mongodb');

const connectionURL = "mongodb://localhost:27017/localex";

const client = mongo.MongoClient;

function saveUploadData(uploadData) {
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').insert(uploadData);
    db.close();
  }); 
}

function getUploads(response, onRender) {
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').find().toArray(function (error, uploads) {
      onUploadsArray(error, uploads, response, onRender);
    });
  });
}

function onUploadsArray(error, uploads, response, onRender) {
  uploads = uploads.map(extractDataFromDBRecord);
  onRender(response, {uploads: uploads});
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
    db.close();
  });
}

function onFindUpload(error, record, response, onFile) {
  if (error) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 File not found.');
  }
  if (record) {
    console.log('Retrieving: ' + record._id);
    onFile(response, record);
  }
}

function deleteFile(response, fileID, onDeleteFile) {
  const mongoID = new mongo.ObjectID(fileID);
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').findOne({_id: mongoID}, function (error, record) {
      if (record) {
        onDeleteFile(response, record.path);
      }
    });
  });
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').deleteOne({_id: mongoID}, function(e, r) {
      console.log('Deleting Mongo record for file ' + fileID);
    });
  });
}

module.exports.saveUploadData = saveUploadData;
module.exports.getUploads = getUploads;
module.exports.getFile = getFile;
module.exports.deleteFile = deleteFile;
