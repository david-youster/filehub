const mongodb = require('mongodb');

const connectionURL = "mongodb://localhost:27017/localex";

const client = mongodb.MongoClient;

function addUpload(data) {
  client.connect(connectionURL, function (error, db) {
    db.collection('uploads').insert(data);
    db.close();
  }); 
}

module.exports.addUpload = addUpload;