const session = require('express-session');
const sessionStore = require('connect-redis')(session)
const { REDIS } = require('../config')

module.exports = () => {
	return session({
		// store session in redis
		store: new sessionStore({
			host: REDIS.RDS_HOST,
			port: REDIS.RDS_PORT,
			db: 55,
		}),
		secret: 'musicine_server_cookie',
		// cookie key in browser
		name: 'session_id',
		resave: false,
		saveUninitialized: false,
		// cookit time limit
		cookie: { maxAge: 60 * 1000 * 30 },
	})
}