let assert = require('assert');

var insertDocuments = function insertDocuments(db, callback) {
    let collection = db.collection('documents');
    //insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the document collection');
        callback(result);
    });  
};

var updateDocument = function updateDocument(db, callback) {
    let collection = db.collection('documents');
    //update document where a is 2, set b equal to 1
    collection.updateOne({a : 2}, { $set: {b : 1} }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated Document");
        callback(result);
    });
};

var deleteDocument = function deleteDocument(db, callback) {
    let collection = db.collection('documents');
    //delete matching document
    collection.deleteOne({a : 3}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed Document");
        callback(result);
    });
};

var findDocuments = function findDocuments(db, callback) {
    let collection = db.collection('documents');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        assert.equal(2, docs.length);
        console.log("Found the following records: ");
        console.dir(docs);
        callback(docs);
    });
};

module.exports = {
    insertDocuments: insertDocuments,
    updateDocument: updateDocument,
    deleteDocument: deleteDocument,
    findDocuments: findDocuments
};