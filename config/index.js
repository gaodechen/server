const commonConfig = require('./common')
const productionConfig = require('./production')

module.exports = {
	...commonConfig,
	...productionConfig,
}
