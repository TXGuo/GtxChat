var express = require('express');
var app = express();
var path = require('path');
var test = '123';
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

var server = require('http').createServer(app);

var io = require('socket.io')(server);

var clients = {};

io.on('connection', function (socket) {
    var username;
    socket.emit('message', {user: "系统", message: "欢迎进入聊天室！"});
    socket.emit('message', {user: '系统', message: '请输入用户名'});
    socket.on('send', function (msg) {
        var result = msg.match(/^@(.+)\s(.+)$/);
        if (result) {
            var toUser = result[1];
            var content = result[2];
            if (clients[toUser]) {//通过用户名把对应的socket取出来
                clients[toUser].emit('message', {user: username, message: '[私聊]' + content});
            } else {
                socket.emit('message', {user: '系统', message: '你想私聊的人不在线'});
            }
        } else {
            if (username) {
                //把客户端发过来的消息广播给所有的客户端
                for (var s in clients) {
                    clients[s].emit('message', {user: username, message: msg});
                }
            } else {
                username = msg;
                //属性名是用户名，值为对应的socket对象
                clients[username] = socket;
                socket.emit('message', {user: '系统', message: '你的用户名已经修改为 ' + username});
            }
        }
    });
})

server.listen(8089)
