var express = require('express');
var router = express.Router();
var models = require('../models/index');

//注册
router.route('/reg').post(function (req, res, next) {
    var user = req.body;
    models.User.findOne(user, function (err, doc) {
        if (!err) {
            if (doc) {
                res.send({resultCode: 0, msg: "用户名已存在！"});
            } else {
                new models.User(user).save(function (err, user) {
                    if (!err) {
                        req.session.user = user;
                        res.send({resultCode: 1, user: user, msg: '注册成功！'});
                    }
                })
            }
        }
    })
});

//登录
router.route('/login').post(function (req, res, next) {
    var user = req.body;
    models.User.findOne(user, function (err, user) {
        if (!err) {
            req.session.user = user;
            res.send({resultCode: 1, user: user});
        } else {
            res.send({resultCode: 0, msg: '用户名或者密码错误！'});
        }
    })
});

//退出
router.route('/logOut').get(function (req, res, next) {
    req.session.user = null;
    res.send({resultCode: 1, msg: '退出成功！'});
});

//验证登录状态
router.route('/validate').get(function (req, res, next) {
    if (req.session.user) {
        res.send({resultCode: 1, user: req.session.user});
    } else {
        res.send({resultCode: 0, msg: '未登录！'});
    }
});

module.exports = router;


