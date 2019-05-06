const Music = require('../models/music');
const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description add new music to database
 * @param {*} musicInfo
 * @returns promise.resolve([code, msg, data of new music])
 *          or promise.reject([code, msg])
 */
exports.post = async (musicInfo) => {
    let music = new Music({ ...musicInfo });
    return await music.save()
        .then(data => {
            return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.POST, data];
        })
        .catch(error => {
            throw [];
        });
}

/**
 * @description find music by _id
 * @param {ObjectId} _id
 * @returns promise.resolve([code, msg, data of music found])
 *          or promise.reject([code, msg])
 */
exports.findById = async (_id) => {
    // find by _id
    return await Music.findOne({ _id })
        .then(data => {
            if (data) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.FOUND, data];
            } else {
                // not found
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            throw error;
        })
}

/**
 * @description delete music from database
 * @param {ObjectId} _id
 * @returns promise.resolve([code, msg])
 *          or promise.reject([code, msg])
 */
exports.deleteById = async (_id) => {
    return await Music.deleteOne({ _id })
        .then(result => {
            if (result.n === 1) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.DELETE];
            } else {
                // not found
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            throw error;
        })
}

exports.putById = async (_id, musicInfo) => {
    return await Music.findOneAndUpdate({ _id }, { ...musicInfo })
        .then(result => {
            return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.UPDATE]
        })
        .catch(error => {
            throw [];
        })

}