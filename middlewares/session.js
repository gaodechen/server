const session = require('express-session');
// const sessionStore = require('connect-redis')(session)
// const redis = require('redis')
// const { REDIS } = require('../config')

// const redisSession = require('node-redis-session');

module.exports = () => {
	return session({
		secret: 'musicine_server_cookie',
		// cookie key in browser
		name: 'session_id',
		resave: false,
		saveUninitialized: false,
		// cookit time limit
		cookie: { maxAge: 60 * 1000 * 30, httpOnly: true },
	})
}