var SessionModel = require('../model/session')

module.exports = {
    checkLogin(req, res, next) {
        var token = req.headers.token;
        if (!token) {
            throw new Error('invalid token');
        }
        SessionModel.find(token).then(result => {
            if (!result) {
                throw new Error('invalid token');
            } else {
                var now = (new Date()).getTime();
                if (now < result.expire * 1) {
                    req.session = req.session || {};
                    delete result.expire;
                    delete result.session_id;
                    //{"user_id": 27,"username": "yuchav"}
                    req.session.user = result;
                    next()
                } else {
                    throw new Error('token expired')
                }
            }
        }).catch(next)
    }
}