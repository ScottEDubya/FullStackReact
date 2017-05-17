var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('client'));

app.get('/', function(req, res) {
    //res.send("Hello World");
    res.sendFile(path.join(__dirname + 'client/index.html'));
});

app.listen(3001, function() {
    console.log("App running at http://localhost:3001");
});