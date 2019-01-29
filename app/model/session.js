var db = require('../db.js');

module.exports = {
    //新增一个session
    create(item) {
        return new Promise((resolve, reject) => {
            db.query('REPLACE INTO session SET ?', item, function(error, result, field) {
                if (error) {
                    return reject(error)
                }
                //replce的时候,affectedRows可能为2
                if (result && result.affectedRows) {
                    resolve(item);
                } else {
                    reject(new Error('Session Create Failed'))
                }
            })
        })
    },
    find(session_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM session WHERE session_id = ?', session_id, function(error, result, field) {
                if (error) {
                    return reject(error)
                }
                if (result && result[0] && result[0].session_id) {
                    resolve(result[0])
                } else {
                    resolve(null);
                }

            })
        })
    },
}