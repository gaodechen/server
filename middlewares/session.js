const session = require('express-session');
const sessionStore = require('connect-redis')(session)
const { REDIS } = require('../config')

module.exports = () => {
	return session({
		// store session in redis
		secret: 'musicine_server_cookie',
		// cookie key in browser
		name: 'session_id',
		resave: false,
		saveUninitialized: false,
		// cookit time limit
		cookie: { maxAge: 60 * 1000 * 30 },
	})
}