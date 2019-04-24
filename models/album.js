const { mongoose } = require('../lib/mongodb')

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },

    // list of songs
    songList: { type: Array },

    authorID: {
        type: mongoose.Schema.Types.ObjectId,
    },

    // creating time
	createTime: {
        type: Date, default: Date.now
    },

    // last time of updating
	updateTime: {
        type: Date, default: Date.now
    },
})

module.exports = mongoose.model('Album', albumSchema)
