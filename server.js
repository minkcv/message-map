var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var sanitize = require('sanitize-html');
var login = process.env.LOGIN;
mongoose.connect('mongodb+srv://' + login + '@message-map.b9e8m.mongodb.net/message-map?retryWrites=true&w=majority');
var Message = require('./message-model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var router = express.Router();

router.use(function(req, res, next) {
    console.log('request was made');
    next();
})

router.get('/', function(req, res) {
    res.send('did you expect me to describe the api or something?');
});

router.route('/message')
    .post(function(req, res) {
        var msg = new Message();
        console.log(req.body);
        msg.name = sanitize(req.body.name);
        msg.lat = sanitize(req.body.lat);
        msg.long = sanitize(req.body.long);
        msg.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'message created'});
        })
    })
    .get(function(req, res) {
        Message.find(function(err, msgs) {
            if (err)
                res.send(err);

            res.json(msgs);
        })
    })

app.use('/api', router);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(port);
console.log('Message Map server on :' + port);
