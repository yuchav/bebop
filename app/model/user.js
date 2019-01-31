var db = require('../db.js');

module.exports = {
    create(user) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user SET ?', user, function(error, result, field) {
                if (error) {
                    return reject(error);
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
                //         "username": "xxx",
                //         "password": "xxx",
                //         "create_time": xxx
                //     }
                // ]
                if (result && result[0] && result[0].id) {
                    delete result[0].password;
                    resolve(result[0]);
                } else {
                    resolve(null);
                }
            })
        })
    }
}