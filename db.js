const mongodb = require('mongodb');

const connectionURL = "mongodb://localhost:27017/localex";

const client = mongodb.MongoClient;

function saveUploadData(uploadData) {
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').insert(data);
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

module.exports.saveUploadData = saveUploadData;
module.exports.getUploads = getUploads;
