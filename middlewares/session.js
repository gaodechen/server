// const session = require('express-session');
// const sessionStore = require('connect-redis')(session)
// const redis = require('redis')
const { REDIS } = require('../config')

const redisSession = require('node-redis-session');

module.exports = () => {
	return redisSession({
		cookieName: 'musicine_server_cookie',
		redisOptions: [REDIS.RDS_PORT, REDIS.RDS_HOST],
	})
}