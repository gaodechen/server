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

    // type of user
    type: {
        type: String,
        required: true,
        default: USER_TYPE.USER
    },

    // users _id following
    following: { type: [mongoose.Schema.Types.ObjectId] },

    // fans _id
    followers: { type: Array, },

    // songs _id collected
    collections: { type: Array, },

    // articles _id
    articles: { type: Array, },

    // image path of avatar
    avatar: {
        type: String,
        default: 'default_avatar.png'
    },

    // register time
    createTime: {
        type: Date,
        default: Date.now
    },

    // last time of updating
    udpateTime: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', userSchema)