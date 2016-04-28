var express = require('express');
var app = express();
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);
mongoose.connect('mongodb://localhost/chat')
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

io.sockets.on('connection',function(socket){

socket.on('send msg', function(data){
  io.sockets.emit('get msg',data);
})
})
