// Express.js stuff
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);

// Websockets with socket.io

var config = require('./config');

server.listen(config.serverport,config.serverip,function() {

  console.log("Server running @ http://" + config.serverip + ":" + config.serverport);

});

 // Allow some files to be server over HTTP
/*app.use("/member/scripts", express.static(__dirname + "/scripts"));
app.use("/member/vendor", express.static(__dirname + "/vendor"));
app.use("/member/styles", express.static(__dirname + "/styles"));
app.use("/member/bower_components", express.static(__dirname + "/bower_components"));*/

app.use(express.static(__dirname + '/'));
// Serve GET on http://domain/
app.all('/*', function(req, res, next) {
  res.sendfile(__dirname + '/index.html', { root: __dirname });
});