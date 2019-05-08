// address of front end server
exports.FRONT_END_HOST = 'http://localhost:3001'
// address of nginx forwarding port
exports.FORWARDING_HOST = 'http://47.111.165.214:4534'
// address for system test server
exports.TEST_HOST_LIST = 'http://47.111.178.254'
// address of static server
exports.STATIC_SERVER = 'http://47.111.165.214:3002'
// MongoDB config
exports.MONGODB = {
    uri: 'mongodb://musicine.mongodb.rds.aliyuncs.com:3717/musicine',
};

const RDS_PORT = 6379
const RDS_HOST = 'musicine.redis.rds.aliyuncs.com'

// Redis config
exports.REDIS = {
    RDS_PORT,
    RDS_HOST,
	RDS_OPTS: {},
}

exports.SESSION_STORAGE = {
	port: RDS_PORT,
	host: RDS_HOST,
	db: 55,
}
