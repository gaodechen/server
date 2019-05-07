// address of front end server
exports.FRONT_END_HOST = 'http://localhost:3001'
// address of nginx forwarding port
exports.FORWARDING_HOST = 'http://localhost:4534'
// address for system test server
exports.TEST_HOST = 'http://localhost'
// address of static server
exports.STATIC_SERVER = 'http://localhost:3002'
// MongoDB config
exports.MONGODB = {
    uri: 'mongodb://127.0.0.1:27017/musicine',
    username: 'DB_username',
    password: 'DB_password',
};

const RDS_PORT = 6379
const RDS_HOST = '127.0.0.1'

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
