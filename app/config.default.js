module.exports = {
    name: 'bebop',
    host: 'http://localhost:3000',
    session: {
        maxAge: 1 * 30 * 24 * 60 * 60 * 1000 //1个月
    },
    mysql: {
        host: 'http://localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'bebop'
    }
}