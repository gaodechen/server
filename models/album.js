const { mongoose } = require('../lib/mongodb')

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },

    content: { type: Array },

    styleLabel: { type: Array },

    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

	// 创建日期
	createTime: {
        type: Date, default: Date.now
    },
})

module.exports = mongoose.model('Album', albumSchema)
