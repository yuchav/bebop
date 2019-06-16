var db = require('../db.js');

module.exports = {
    createOne(item) {
        return new Promise((resolve, reject) => {
            db.query('REPLACE INTO session SET ?', item, function(error, result, field) {
                if (error) {
                    return reject(error)
                }
                //REPLACE,affectedRows=2
                if (result && result.affectedRows) {
                    return resolve(item);
                } else {
                    return reject(new Error('session create failed'))
                }
            })
        })
    },
    findOne(session_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM session WHERE session_id = ?', session_id, function(error, result, field) {
                if (error) {
                    return reject(error)
                }
                if (result && result[0] && result[0].session_id) {
                    return resolve(result[0])
                } else {
                    return resolve(null);
                }
            })
        })
    },
}