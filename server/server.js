var express = require('express');
var path = require('path');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const envVars = require('./environmentVariables');
const dbUtils = require('./utils/dbutils');

app.use(express.static('client'));

let url = 'mongodb://' + envVars.MONGO_HOST + ':27017/' + envVars.MONGO_DB_NAME;

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Running mongodb at url: ' + url);

    dbUtils.insertDocuments(db, function(result) {
        console.log('result of the insert: ' + result);

        dbUtils.updateDocument(db, function(result) {
            console.log('result of the update: ' + result);

            dbUtils.deleteDocument(db, function(result) {
                console.log('result of the delete: ' + result);

                dbUtils.findDocuments(db, function(result) {
                    db.close();
                });
            });
        });
    });
});

app.get('/', function(req, res) {
    //res.send("Hello World");
    res.sendFile(path.join(__dirname + 'client/index.html'));
});

app.listen(3001, function() {
    console.log("App running at http://localhost:3001");
});