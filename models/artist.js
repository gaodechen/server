const { mongoose } = require('../lib/mongodb')

const artistSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true
    },

    // 创作风格标签
    styleLabel: {
        type: Array,
    },

    // 创作情感标签
    emotionLabel: {
        type: Array,
    },

    // 头像文件名称
    avatar: {
        type: String,
        default: 'default_avatar.png'
    },
})

module.exports = mongoose.model('Artist', artistSchema)