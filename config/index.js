const developmentConfig = require('./development')
const productionConfig = require('./production')
const commonConfig = require('./common')

if (process.env.NODE_ENV == 'production') {
	module.exports = {
		...commonConfig,
		...productionConfig,
	}
} else {
	module.exports = {
		...commonConfig,
		...developmentConfig,
	}
}