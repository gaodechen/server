const { mongoose } = require('../lib/mongodb')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
    },

    playlist: {
        type: Array,
    },

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    // time created
	createTime: {
        type: Date,
        default: Date.now,
        index: true,
    },

    // time last updated
	updateTime: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Article', articleSchema)
