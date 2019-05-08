const crypto = require('crypto')
const { mongoose } = require('../lib/mongodb')

const USER_TYPE = require('../constants')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
    },

    password: {
        type: String,
        required: true,
        default: crypto
            .createHash('md5')
            .update('root')
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

    // an array of articles list
    articles: { type: Array },

    // an array of composition list
    composition: { type: Array },

    // articles  _id collected
    articleCollection: { type: Array, },

    // songs  _id collected
    musicCollection: { type: Array, },

    // preferred style of music
    preference: { type: Array, },

    // articles _id
    articles: { type: Array, },

    // image path of avatar
    avatar: {
        type: String,
        default: 'default_avatar.png'
    },

    // creation time of account
    createTime: {
        type: Date,
        default: Date.now
    },

    // last time updated
    udpateTime: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', userSchema)