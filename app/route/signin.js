var express = require('express')
var router = express.Router();

var sha1 = require('sha1');
var uuid = require('uuid/v1');

var session = require('../config.js').session;
var UserModel = require('../model/user.js');
var SessionModel = require('../model/session.js');


router.post('/', function(req, res, next) {

    var body = req.body;
    var username = body.username || '';
    var password = body.password || '';

    // 校验参数
    if (!username.length) {
        return next(new Error('请填写用户名'));
    }
    if (!password.length) {
        return next(new Error('请填写密码'));
    }

    var user = {
        username: username,
        password: sha1(password)
    }

    UserModel.find(user).then(item => {
            if (!item) {
                throw new Error('用户名或密码错误');
            } else {
                var sessionItem = {
                    user_id: item.id,
                    username: item.username,
                    expire: (new Date().getTime()) + session.maxAge,
                    session_id: uuid()
                }

                return SessionModel.create(sessionItem);
            }
        }).then(function(item) {
            res.json({
                success: true,
                token: item.session_id
            })
        })
        .catch(next)
})


module.exports = router;