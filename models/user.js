const crypto = require('crypto')
const { argv } = require('yargs')
const { mongoose } = require('../lib/mongodb')
const autoIncrement = require('mongoose-auto-increment')

const USER_TYPE = require('../constants')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        default: crypto
            .createHash('md5')
            .update(argv.auth_default_password || 'root')
            .digest('hex')
    },

    email: {
        type: String,
        required: true,
        validate: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    },

    // 用户类型
    type: {
        type: Number,
        required: true,
        default: USER_TYPE.USER
    },

    // 关注的用户ID
    following: {
        type: Array,
    },

    // 粉丝
    followers: {
        type: Array,
    },

    articles: {
        type: Array,
    },

    // 喜好风格标签
    styleLabel: {
        type: Array,
    },
})

// ID自增插件
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1,
    incrementBy: 1
})

module.exports = mongoose.model('User', userSchema)