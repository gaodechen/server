// const session = require('express-session');
// const sessionStore = require('connect-redis')(session)
// const redis = require('redis')
// const { SESSION_STORAGE } = require('../config')

const redisSession = require('node-redis-session');

module.exports = () => {
	return redisSession({ cookieName: 'musicine_server_cookie'})
}