const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
var app = express();
//var __dirname = '/home/sidkathuria14/Desktop/Impulse18Website';

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/assets')));
// app.use(express.static(__dirname));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(8080);