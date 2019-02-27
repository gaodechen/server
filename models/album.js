const { mongoose } = require('../lib/mongodb')

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },

    // 歌曲ID列表
    songList: { type: Array },

    // 专辑风格标签
    styleLabel: { type: Array },

    // 专辑情感偏向
    emotionLabel: { type: Array },

    authorType: {
        type: String,
        default: authorType.USER,
    },

    authorID: {
        type: mongoose.Schema.Types.ObjectId,
    },

	// 创建日期
	createTime: {
        type: Date, default: Date.now
    },

    // 更新日期
	updateTime: {
        type: Date, default: Date.now
    },
})

module.exports = mongoose.model('Album', albumSchema)
