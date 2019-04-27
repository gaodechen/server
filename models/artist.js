const { mongoose } = require('../lib/mongodb')

const artistSchema = new mongoose.Schema({
    // name of artist
    name: {
        type: String,
        required: true
    },

    compositionList: {
        type: Array,
    },

    // filepath of avatar
    avatar: {
        type: String,
        default: 'default_avatar.png'
    },
})

module.exports = mongoose.model('Artist', artistSchema)