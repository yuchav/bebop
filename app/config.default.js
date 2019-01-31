module.exports = {
    isDebug : true,
    name: 'bebop',
    host: 'http://localhost',
    port : 3000,
    session: {
        maxAge: 1 * 30 * 24 * 60 * 60 * 1000
    },
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'bebop'
    }
}