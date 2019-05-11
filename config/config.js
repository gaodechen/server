// address of front end server
exports.FRONT_END_HOST = 'http://localhost:3001'
// address of nginx forwarding port
exports.FORWARDING_HOST = 'http://47.111.165.214:4534'
// address for system test server
exports.TEST_HOST_LIST = 'http://47.111.178.254'

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
	  // RDS_HOST: 'localhost',
	  RDS_OPTS: {},
}

// Recommender config creator
exports.RECOMMENDER_CREATOR = (className, nearestNeighbors) => ({
		className,
		nearestNeighbors,
		})
