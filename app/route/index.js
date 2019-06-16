module.exports = function(app) {
    app.get('/', function(req, res) {
        return res.send('it works!');
    })
    app.get('/error', function(req, res, next) {
        throw new Error('such error!');
    })
    app.get('/api', function(req, res, next) {
        return res.send('ver1.0');
    });

    app.use('/api/signup', require('./signup.js'));
    app.use('/api/signin', require('./signin.js'));
    app.use('/api/user', require('./user.js'));
    app.use('/api/upload', function(req, res, next) {
        res.send('uploading')
    });
}