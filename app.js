var express = require('express');
var app = express();
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);
mongoose.connect('mongodb://localhost/chat',function(err){
  if (err)
  throw err;
  else
    console.log('connect');
});
var msgSchema = mongoose.Schema({ msg:String,
time:{ type: Date , default: Date.now}
});
var Chat = mongoose.model('message',msgSchema);


io.sockets.on('connection',function(socket){

socket.on('send msg', function(data){
  var newMsg = new Chat({msg:data});
  newMsg.save(function(err){
    if(err) throw erro;
    else
    io.sockets.emit('get msg',data);
  })

})
})
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
