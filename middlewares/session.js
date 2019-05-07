const session = require('express-session');
const sessionStore = require('connect-redis')(session)
const { SESSION_STORAGE } = require('../config')

module.exports = function sessionMiddleware() {
    return session({
        store: new sessionStore(SESSION_STORAGE),
        secret: 'musSession',
        saveUninitialized: false,
        // update cookie after each request
        resave: false,
        // available time for cookie
        cookie: { maxAge: 60 * 1000 * 60 },
    })
}