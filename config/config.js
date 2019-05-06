const { argv } = require('yargs');

// address of front end server
exports.FRONT_END_HOST = 'http://localhost:3001'
// address of nginx forwarding port
exports.FORWARDING_HOST = 'http://localhost:4534'

// address of static server
exports.STATIC_SERVER = 'http://localhost:3002'

exports.PORT = process.env.PORT || '3000'

// MongoDB config
exports.MONGODB = {
	uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/musicine`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password',
};

// Redis config
exports.REDIS = {
	RDS_PORT: 6379,
	RDS_HOST: '127.0.0.1',
	RDS_OPTS: {},
}

// Recommender config creator
exports.RECOMMENDER_CREATOR = (className, nearestNeighbors) => ({
	className,
	nearestNeighbors,
})
