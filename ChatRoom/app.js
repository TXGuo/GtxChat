var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'app')))
var server = app.listen(8080);
var io = require('socket.io')(server);
var messages = [];
io.on('connection', function (socket) {
    socket.emit('connected');

    //监听客服端新消息
    socket.on('message.add', function (msg) {
        console.log('新增');
        messages.push(msg);
        io.sockets.emit('message.new', msg);
    })

    //所有消息
    socket.on('message.all', function () {
        console.log('全部');
        socket.emit('messageAll', messages);
    })
})