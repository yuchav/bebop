var express = require('express')
var router = express.Router();

var sha1 = require('sha1');
var uuid = require('uuid/v1');

var sessionConfig = require('../config.js').session;
var UserModel = require('../model/user.js');
var SessionModel = require('../model/session.js');


router.post('/', function(req, res, next) {
    var body = req.body;
    var username = body.username || '';
    var password = body.password || '';

    if (!username.length) {
        throw new Error('need username');
    }
    if (!password.length) {
        throw new Error('need password');
    }

    var user = {
        username: username,
        password: sha1(password)
    }

    UserModel.findOne(user).then(item => {
            if (!item) {
                throw new Error('invalid username or password');
            } else {
                var sessionItem = {
                    user_id: item.id,
                    username: item.username,
                    expire: (new Date().getTime()) + sessionConfig.maxAge,
                    session_id: uuid()
                }
                return SessionModel.createOne(sessionItem);
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