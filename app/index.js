var express = require('express');
var app = express();
var route = require('./route')
var config = require('./config.js');
var path = require('path');
var bodyParser = require('body-parser');

var fs = require('fs')
var FileStreamRotator = require('file-stream-rotator')
var morgan = require('morgan')

var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

route(app);

app.use(function(err, req, res, next) {
  return res.json({
    success: false,
    message: err.message,
    root: true
  })
});

app.listen(config.port, function() {
    console.log(`app listening on ${config.host}:${config.port}`);
});

module.exports = app;