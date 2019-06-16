var express = require('express')
var router = express.Router();

var sha1 = require('sha1');
var uuid = require('uuid/v1');

var auth = require('../middleware/auth');
var UserModel = require('../model/user.js');
var SessionModel = require('../model/session.js');


router.get('/self', auth, function(req, res, next) {
    var user = req.session.user;
    // {
    //     "user_id": xx,
    //     "username": "xxx",
    //     "session_id": "xxxx"
    // }
    return res.json(user);
})

module.exports = router;