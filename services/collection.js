const mongoose = require('mongoose')
const { HTTP_CODE, HTTP_MSG } = require('../constants')
const User = require('../models/user')
const recommender = require('../lib/recommender')

/**
 * @description Collection type could be Music or Article
 *              Currying middleware functions to deal with two types
 */

/**
 * @description find collection[likedType] by user _id
 * @returns [httpCode, httpMsg, data of userinfo in collection list]
 */
exports.findById = (likedType) => async (_id) => {
    return await User.findById(_id)
        .then(userInfo => {
            if (userInfo) {
                // list of collection[likedType] id
                let list = userInfo[likedType];
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.GET, list]
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            return error;
        });
}

/** 
 * @description add collectionId to collection list of user _id in database
 *              and mark item with "like" in real-time recommendation system
 * @returns [httpCode, httpMsg, data]
 */
exports.post = (likedType) => async (_id, collectionId) => {
    // articleCollection -> article
    return await User.findByIdAndUpdate(_id, {
        // addToSet
        $addToSet: { [likedType]: collectionId }
    })
        .then(userInfo => {
            if (userInfo) {
                let field = userInfo[likedType];
                // collectionId not exists yet
                if (field && field.indexOf(collectionId) === -1) {
                    // payload for recommender updating
                    let className = likedType.substring(0, likedType.length - 10);
                    let payload = {
                        _id: userInfo._id.toString(),
                        likedId: collectionId,
                        recType: className
                    }
                    // insert collectionId to list
                    field.push(collectionId)
                    recommender.liked(payload)
                    return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.COLLECT, field];
                } else {
                    return [HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ALREADY_EXISTS]
                }
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            throw error;
        });
}

exports.deleteById = (likedType) => async (_id, collectionId) => {
    return await User.findOneAndUpdate({ _id }, {
        $pull: { [likedType]: collectionId }
    })
        // user of _id exists
        .then(userInfo => {
            if (userInfo) {
                let field = userInfo[likedType];
                // collectionId exists
                if (field.indexOf(collectionId) !== -1) {
                    let className = likedType.substring(0, likedType.length - 10);
                    let payload = {
                        _id: userInfo._id.toString(),
                        likedId: collectionId,
                        recType: className,
                    }
                    recommender.unliked(payload);
                    return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.DELETE, field]
                } else {
                    throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
                }
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            throw error
        });
}