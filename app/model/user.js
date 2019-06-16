var db = require('../db.js');

module.exports = {
    createOne(user) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user SET ?', user, function(error, result, field) {
                if (error) {
                    return reject(error);
                }
                if (result && result.affectedRows === 1 && result.insertId) {
                    return resolve(result.insertId);
                } else {
                    return reject(new Error('Insert User Error'));
                }
            })
        })
    },
    findOne({ username, password }) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, result, field) {
                if (error) {
                    return reject(error);
                    //if no return, there will be excute
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
                    return resolve(result[0]);
                } else {
                    return resolve(null);
                }
            })
        })
    }
}