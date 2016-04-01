var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chat');
var model = mongoose.model('user', {
    username: String,
    password: String,
    email: String,
    createTime: {type: Date, default: Date.now()}
})
exports.User = model;