const { mongoose } = require('../lib/mongodb')

const musicSchema = new mongoose.Schema({
    // title of music
    title: {
        type: String,
        required: true
    },

    // filepath of music
    src: { type: String },

    // author
    author: {
        type: Array,
    },

    // lyrics
    lyric: {
        type: String
    },

    // thumbnail of music
    thumbnail: {
        type: String,
        default: 'default_thumbnail.png',
    },

    // begining time of refrain
    refBegin: { type: Number },

    // end time of refrain
    refEnd: { type: Number },

	// creation time
	createTime: {
        type: Date, default: Date.now,
    },

    // time last updated
	updateTime: {
        type: Date, default: Date.now
    },
})

musicSchema.set('autoIndex', false);

module.exports = mongoose.model('Music', musicSchema)