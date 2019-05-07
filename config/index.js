const commonConfig = require('./common')

if (process.env.NODE_ENV == 'production') {
	const productionConfig = require('./production')
	module.exports = {
		...commonConfig,
		...productionConfig,
	}
} else {
	const developmentConfig = require('./development')
	module.exports = {
		...commonConfig,
		...developmentConfig,
	}
}