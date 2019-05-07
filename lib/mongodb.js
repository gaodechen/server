const consola = require('consola')
const mongoose = require('mongoose')
const config = require('../config')

// remove DeprecationWarning
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

// mongoose Promise
mongoose.Promise = global.Promise;

// connect mongodb
mongoose.connect(config.MONGODB.uri);

// connection error
mongoose.connection.on('error', error => {
    consola.warn('无法连接MongoDB数据库！', error)
})

// connection success
mongoose.connection.once('open', () => {
    consola.ready('MongoDB数据库链接成功！')
})

// autoIncrement.initialize(mongoose.connection);

exports.mongoose = mongoose;