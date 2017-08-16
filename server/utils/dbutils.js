const assert = require('assert');

/**
* Inserts an array of documents into the collection
* @param {object} db the database instance
* @param {object} data the array to insert
* @param {function} callback the callback method to be invoked
*/
var insertDocuments = function insertDocuments(db, data, callback) {
    let collection = db.collection('documents');
    //insert some documents
    collection.insertMany(data, (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the document collection');
        callback(result);
    });  
};

/**
* Inserts a document into the collection
* @param {object} db the database instance
* @param {object} the document to insert
* @param {function} callback the callback method to be invoked
*/
var insertDocument = function insertDocument(db, data, callback) {
    let collection = db.collection('documents');
    //insert some documents
    collection.insertOne(data, (err, result) => {
        assert.equal(err, null);
        console.log('Inserted a document into the document collection');
        callback(result);
    });  
};

/**
* Updates a specified value in the collection
* @param {object} db the database instance
* @param {object} updateObj the object to replace
* @param {object} newObjthe object to insert
* @param {function} callback the callback method to be invoked
*/
var updateDocument = function updateDocument(db, updateObj, newObj, callback) {
    let collection = db.collection('documents');
    //update document where a is 2, set b equal to 1
    collection.updateOne(updateObj, { $set: newObj }, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated Document");
        callback(result);
    });
};

/**
* Deletes a document from the collection
* @param {object} db the database instance
* @param {object} data the entry to delete
* @param {function} callback the callback method to be invoked
*/
var deleteDocument = function deleteDocument(db, data, callback) {
    let collection = db.collection('documents');
    //delete matching document
    collection.deleteOne(data, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed Document");
        callback(result);
    });
};

/**
* Grabs all documents from the collection
* @param {object} db the database instance
* @param {function} callback the callback method to be invoked
*/
var findDocuments = function findDocuments(db, callback) {
    let collection = db.collection('documents');
    collection.find({}).toArray( (err, docs) => {
        assert.equal(err, null);
//        console.log("Found the following records: ");
//        console.dir(docs);
        callback(docs);
    });
};

module.exports = {
    insertDocuments: insertDocuments,
    insertDocument: insertDocument,
    updateDocument: updateDocument,
    deleteDocument: deleteDocument,
    findDocuments: findDocuments
};