const { argv } = require('yargs');

// host address
exports.HOST = 'http:/127.0.0.1';
// ports of front & static server
exports.FRONT_SERVER_PORT = '3001';
exports.STATIC_SERVER_PORT = '3002';

// address of front server
exports.FRONT_SERVER = 'http://127.0.0.1:3001/'
// address of static server
exports.STATIC_SERVER = 'http://127.0.0.1:3002/'

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

// 推荐系统 配置
exports.RECOMMENDER = {
	// 推送的类别
	className: 'music',
	// 参与计量的相似用户数量
	nearestNeighbors: 20,
}