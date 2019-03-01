const { mongoose } = require('../lib/mongodb')

const musicSchema = new mongoose.Schema({
    musicName: { type: String, required: true },

    musicSrc: { type: String },

    // 歌词
    lyric: { type: String },

    // 封面图
    imgSrc: { type: String },

    // 风格标签
    styleLabel: { type: Array },

    // 情感标签
    emotionLabel: { type: Array },

    // 高潮开始时间/持续时间
    climaxAt: { type: String },
    climaxTime: { type: Number },

	// 创建日期
	createTime: {
        type: Date, default: Date.now
    },

    // 更新日期
	updateTime: {
        type: Date, default: Date.now
    },
})

module.exports = mongoose.model('Music', musicSchema)