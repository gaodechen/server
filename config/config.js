const { argv } = require('yargs');

exports.FRONT_SERVER = 'http://127.0.0.1:3001/'

exports.PORT = process.env.PORT || '3000'

// MongoDB 配置
exports.MONGODB = {
	uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/musicine`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password',
};

// Redis 配置
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