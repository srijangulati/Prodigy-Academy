//require
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var cAndB = require('./cAndB');

var app = express();

var cources = [{
        name: "cource1",
        about: "very imp"
    }],
    batches = [{
        name: "batch 1",
        about: "very imp too"
    }];

//middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/welcome', function (req, res) {
    //check if authorised

    res.sendFile(path.join(__dirname, 'cources.html'))
});

app.get('/getCources', function (req, res) {
    res.send(cAndB.cources);
});

app.get('/getBatches', function (req, res) {
    res.send(cAndB.batches);
});

app.post('/putCources', function (req, res) {
    cAndB.updateC(req.body);
    res.send(req.body);
});

app.post('/putBatches', function (req, res) {
    cAndB.updateB(req.body);
    res.send(req.body);
});

var port = process.env.PORT || 3000;
var ip = process.env.IP || 'localhost';
app.listen(port, ip);