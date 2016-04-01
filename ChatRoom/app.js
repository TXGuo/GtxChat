var express = require('express');
var path = require('path');
var users = require('./routes/users');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session)
var app = express();
app.use(express.static(path.join(__dirname, 'app')))
var server = app.listen(8080);

//引用中间件
app.use(bodyParser.json())
app.use(session({
    secret: 'chat',
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/chat'
    }),
    resave: false,
    saveUninitialized: true

}))
app.use('/users', users)

var io = require('socket.io')(server);
var messages = [];


io.on('connection', function (socket) {
    socket.emit('connected');

    //监听客服端新消息
    socket.on('message.add', function (msg) {
        messages.push(msg);
        io.sockets.emit('message.new', msg);
    })

    //所有消息
    socket.on('message.all', function () {
        socket.emit('messageAll', messages);
    })
})