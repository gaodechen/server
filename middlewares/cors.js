const cors = require('cors')
const config = require('../config/config')

// whitelist for CORS domain
const corsOptions = {
	origin: [config.FRONT_END_HOST, config.FORWARDING_HOST]
}

/**
 * @description return a cors object with configuration
 * @returns
 */
exports.cors = function () {
	return cors(corsOptions)
}