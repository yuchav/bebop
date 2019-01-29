var db = require('../db.js');

module.exports = {
    //注册一个用户
    create(user) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user SET ?', user, function(error, result, field) {
                if (error) {
                    return reject(error)
                }
                if (result && result.affectedRows === 1 && result.insertId) {
                    resolve(result.insertId);
                } else {
                    reject(new Error('Insert User Error'));
                }
            })
        })
    },
    find({ username, password }) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, result, field) {
                if (error) {
                    return reject(error)
                }

                // "result": [
                //     {
                //         "id": 8,
                //         "username": "yuchav",
                //         "password": "143b1830113a0e7bc4383366324d5a74161d3033",
                //         "create_time": 2147483647
                //     }
                // ]

                //对于获取资源,获取到固然好,未获取到不应视为错误
                if (result && result[0] && result[0].id) {
                    delete result[0].password;
                    resolve(result[0]);
                } else {
                    resolve(null);
                }
            })
        })
    },
    // 通过用户名获取用户信息
    findItemByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE username = ?', username, function(error, result, field) {
                if (error) {
                    return reject(error)
                }
                if (result && result[0] && result[0].username) {
                    delete result.password;
                    resolve(result[0])
                } else {
                    resolve(null)
                }

            })
        })
    }
}