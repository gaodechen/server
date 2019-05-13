const commonConfig = require('./common')
const productionConfig = require('./production')
const developmentConfig = require('./development')

module.exports = {
	...commonConfig,
	...developmentConfig,
}
