const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();


app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/assets')));
// app.use(express.static(__dirname));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT);