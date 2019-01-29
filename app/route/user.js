var express = require('express')
var router = express.Router();

var sha1 = require('sha1');
var uuid = require('uuid/v1');

var session = require('../config.js').session;
var checkLogin = require('../middleware/check').checkLogin
var UserModel = require('../model/user.js');
var SessionModel = require('../model/session.js');


router.get('/self', checkLogin, function(req, res, next) {
    var user = req.session.user;
 //    {
	//     "user_id": 27,
	//     "username": "yuchav",
	//     "session_id": "4b016fd0-2397-11e9-b6ce-3b1a4f7de3fd"
	// }
    res.json(user);
})

module.exports = router;