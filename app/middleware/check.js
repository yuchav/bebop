var SessionModel = require('../model/session')

module.exports = {
    checkLogin(req, res, next) {
        var token = req.headers.token;
        if (!token) {
            throw new Error('缺少会话')
        }
        SessionModel.find(token).then(result => {
            if (!result) {
                throw new Error('会话失效');
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
                    throw new Error('会话过期')
                }
            }
        }).catch(next)
    }
}