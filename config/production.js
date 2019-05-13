// address of front end server
exports.FRONT_END_HOST = 'http://localhost:3001'
// address of nginx forwarding port
exports.FORWARDING_HOST = 'http://47.98.157.29:4534'
// address for system test server
exports.TEST_HOST_LIST = 'http://47.111.178.254'
// address of static server
exports.STATIC_SERVER = 'http://47.98.157.29:3002'
// MongoDB config
const MG_SET = [
	'musicine.mongodb.rds.aliyuncs.com:3717',
	'musicine1.mongodb.rds.aliyuncs.com:3717',
	'musicine2.mongodb.rds.aliyuncs.com:3717',
	'musicine3.mongodb.rds.aliyuncs.com:3717',
]
const MONGODB = {
	uri: 'mongodb://' + MG_SET.map(e => e) + '/musicine?replicaSet=mgset-14966795&readPreference=secondaryPreferred',
};

exports.MONGODB = MONGODB;

// mongodb://root:xxxxxxxx@dds-xxxxxxxxxxxx:3717,xxxxxxxxxxxx:3717/admin?replicaSet=mgset-xxxxxx&readPreference=secondaryPreferred
// Primary:musicine.mongodb.rds.aliyuncs.com:3717
// Secondary:musicine1,musicine2,musicine3

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
