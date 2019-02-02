const consola = require('consola')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const config = require('../config/config')

// remove DeprecationWarning
mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)

// mongoose Promise
mongoose.Promise = global.Promise

// mongoose
exports.mongoose = mongoose

exports.connect = () => {
    // connect mongodb
    mongoose.connect(config.MONGODB.uri)

    // connection error
    mongoose.connection.on('error', error => {
        consola.warn('无法连接数据库！', error)
    })

    // connection success
    mongoose.connection.once('open', () => {
        consola.ready('数据库链接成功！')
    })

    autoIncrement.initialize(mongoose.connection)

    return mongoose
}