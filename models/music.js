const { mongoose } = require('../lib/mongodb')
const autoIncrement = require('mongoose-auto-increment')

const musicSchema = new mongoose.Schema({
    musicName: { type: String, required: true },

    musicSrc: { type: String },

    imgSrc: { type: String },

    // 风格标签
    styleLabel: { type: Array },

    // 情感标签
    emotionLabel: { type: Array }
})

// ID自增插件
musicSchema.plugin(autoIncrement.plugin, {
    model: 'Music',
    field: 'id',
    startAt: 1,
    incrementBy: 1
})

module.exports = mongoose.model('Music', musicSchema)