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
    var repassword = body.repassword || '';

    // 校验参数
    if (!(username.length >= 3 && username.length <= 16)) {
        next(new Error('username must be 3-16 characters'))
    }
    if (password.length < 6 || password.length > 128) {
        next(new Error('password must be 6-128 characters'))
    }
    if (password !== repassword) {
        next(new Error('password and repassword not match'));
    }

    password = sha1(password)

    var user = {
        username: username,
        password: password,
        create_time: new Date().getTime()
    }

    UserModel.create(user).then(function(user_id) {
        var sessionItem = {
            user_id: user_id,
            username: user.username,
            expire: (new Date().getTime()) + session.maxAge,
            session_id: uuid()
        }
        return SessionModel.create(sessionItem);
    }).then(function(item) {
        res.json({
            success: true,
            token: item.session_id
        })
    }).catch(function(err) {
        if (err.message.indexOf('ER_DUP_ENTRY') > -1) {
            next(new Error('username has already been signed'))
        } else {
            next(err)
        }
    })
});

module.exports = router;