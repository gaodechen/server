const crypto = require('crypto')
const { argv } = require('yargs')
const { mongoose } = require('../lib/mongodb')

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

    // 歌曲_id收藏
    collections: {
        type: Array,
    },

    // 文章
    articles: {
        type: Array,
    },

    // 喜好风格标签
    styleLabel: {
        type: Array,
    },

    // 情感偏向标签
    styleLabel: {
        type: Array,
    },

    // 头像文件名称
    avatar: {
        type: String,
        default: 'default_avatar.png'
    },

	// 创建日期
	createTime: {
        type: Date, default: Date.now
    },

    // 最后更新时间
	udpateTime: {
        type: Date, default: Date.now
    },
})

module.exports = mongoose.model('User', userSchema)