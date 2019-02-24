const { mongoose } = require('../lib/mongodb')

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },

    content: { type: String },

    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

module.exports = mongoose.model('Article', articleSchema)
