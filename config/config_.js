if (process.env.NODE_ENV === 'production') {
	// address of front end server
	exports.FRONT_END_HOST = 'http://localhost:3001'
	// address of nginx forwarding port
	exports.FORWARDING_HOST = 'http://localhost:4534'
	// address for system test server
	exports.TEST_HOST_LIST = 'http://localhost'
} else {
	// address of front end server
	exports.FRONT_END_HOST = 'http://localhost:3001'
	// address of nginx forwarding port
	exports.FORWARDING_HOST = 'http://47.111.165.214:4534'
	// address for system test server
	exports.TEST_HOST_LIST = 'http://47.111.178.254'
}

// address of static server
exports.STATIC_SERVER = 'http://localhost:3002'

exports.PORT = process.env.PORT || '3000'

// MongoDB config
exports.MONGODB = {
	uri: 'mongodb://musicine.mongodb.rds.aliyuncs.com:3717/musicine',
};

// Redis config
exports.REDIS = {
	RDS_PORT: 6379,
	RDS_HOST: 'musicine.redis.rds.aliyuncs.com',
	RDS_OPTS: {},
}

// Recommender config creator
exports.RECOMMENDER_CREATOR = (className, nearestNeighbors) => ({
	className,
	nearestNeighbors,
})


if (process.env.NODE_ENV === 'production') {
	// address of front end server
	exports.FRONT_END_HOST = 'http://localhost:3001'
	// address of nginx forwarding port
	exports.FORWARDING_HOST = 'http://localhost:4534'
	// address for system test server
	exports.TEST_HOST_LIST = 'http://localhost'
} else {
	// address of front end server
	exports.FRONT_END_HOST = 'http://localhost:3001'
	// address of nginx forwarding port
	exports.FORWARDING_HOST = 'http://47.111.165.214:4534'
	// address for system test server
	exports.TEST_HOST_LIST = 'http://47.111.178.254'
}

// address of static server
exports.STATIC_SERVER = 'http://localhost:3002'

exports.PORT = process.env.PORT || '3000'

// MongoDB config
exports.MONGODB = {
	uri: `mongodb://127.0.0.1:${'27017'}/musicine`,
	username: 'DB_username',
	password: 'DB_password',
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