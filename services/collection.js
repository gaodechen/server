const recommender = require('../lib/recommender')
const User = require('../models/user')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

exports.getCollection = async (_id) => {
    return await User.findOne({ _id })
        .then(userInfo => {
            if(userInfo) {
                let field = userInfo.collections;
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.GET, field]
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            throw []
        })
}

/**
 * @description add item to collection list of userId
 * @param {*} _id _id of user
 * @param {*} likedId item id
 */
exports.addToCollection = async (_id, likedId) => {
    await recommender.liked(_id, likedId)
        .then(() => {
            reuturn [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.COLLECT]
        })
        .catch(() => {
            throw []
        })
}