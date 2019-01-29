var express = require('express');
var app = express();
var route = require('./route')
var config = require('./config.js');
var path = require('path');
const bodyParser = require('body-parser');

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