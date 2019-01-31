module.exports = function(app) {
    app.get('/', function(req, res) {
        return res.send('it works!');
    })
    app.get('/error', function(req, res, next) {
        throw new Error('such error!');
    })

    app.use('/signup', require('./signup.js'));
    app.use('/signin', require('./signin.js'));
    app.use('/user', require('./user.js'));

    //404
    // app.use(function(req, res) {
    //     if (!res.headersSent) {
    //         return res.status(404).json({
    //             success: false,
    //             message: 'invalid url'
    //         })
    //     }
    // })
}