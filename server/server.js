var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const envVars = require('./environmentVariables');
const dbUtils = require('./utils/dbutils');

app.use(bodyParser.json());
app.use(express.static('client'));

let url = 'mongodb://' + envVars.MONGO_HOST + ':27017/' + envVars.MONGO_DB_NAME;

//dbUtils.findDocuments(db, function(result) {
//    db.close();
//});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'client/index.html'));
});

/**
 * Post call inserts an array of documents into the collection.
 */
app.post('/', function(req, res) {
    //    console.log(JSON.stringify(req. body));
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('Running mongodb at url: ' + url);

        let insertArray = req.arr;
        dbUtils.insertDocuments(db, insertArray, function(result) {
            console.log('result of the insert: ' + JSON.stringify(result));
            res.status(200).send(result);
        });
    });
    res.send("yay?");
});

/**
 * Patch call updates an already existing document. If that document doesn't
 * already exist, it's created.
 */
app.patch('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('Running mongodb at url: ' + url);

        let objToUpdate = req.body.oldObj;
        let newObj = req.body.newObj;
        dbUtils.updateDocument(db, objToUpdate, newObj, function(result) {
            console.log('result of the update: ' + JSON.stringify(result));
        });
    });
});

/**
 * Put call inserts one document into the collection.
 */
app.put('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('Running mongodb at url: ' + url);

        let newDoc = req.body;
        dbUtils.insertDocument(db, newDoc, function(result) {
            console.log('result of the insert: ' + JSON.stringify(result));
        });
    });
});

/**
 * Delete call removes all documents from the collection that match
 * the criteria.
 */
app.delete('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('Running mongodb at url: ' + url);

        let deleteObj = req.body;
        dbUtils.deleteDocument(db, {
            a: 3
        }, function(result) {
            console.log('result of the delete: ' + JSON.stringify(result));
        });
    });
});

app.listen(3001, function() {
    console.log("App running at http://localhost:3001");
});