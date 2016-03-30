const mongo = require('mongodb');

const connectionURL = "mongodb://localhost:27017/localex";

const client = mongo.MongoClient;

function saveUploadData(uploadData) {
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').insert(uploadData);
    db.close();
  }); 
}

function getUploads(response, renderFunction) {
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').find().toArray(function (error, uploads) {
      uploads = uploads.map(extractUploadData);
      renderFunction(response, {uploads: uploads});
      db.close()
    });
  });
}

function extractUploadData(doc) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    path: doc.path
  };
}

function getFile(response, fileID, sendFileCallback) {
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').findOne({_id: new mongo.ObjectID(fileID)}, function (error, doc) {
      if (error) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('404 File not found.');
      }
      if (doc) {
        console.log('Found: ' + doc._id);
        sendFileCallback(response, doc);
      } else {
        console.log('Failed retrieving record with id ' + fileID);
      }
    });
  });
}

module.exports.saveUploadData = saveUploadData;
module.exports.getUploads = getUploads;
module.exports.getFile = getFile;
