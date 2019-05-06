const mongoose = require('mongoose')
const User = require('../models/user');
const { HTTP_CODE, HTTP_MSG } = require('../constants')

// Currying functions

/**
 * @description find follow[listName] by user _id
 * @returns [httpCode, httpMsg, data of userinfo in follow list]
 */
exports.findById = (listName) => async (_id) => {
    return await User.findOne({ _id })
        .then(userInfo => {
            if (userInfo) {
                // list of follow[listName] id
                let list = userInfo[listName];
                // covert to ObjectId
                let idList = list.map(item => (
                    new mongoose.Types.ObjectId(item)
                ));
                return User.find({ _id: { $in: idList } });
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        // waiting for promsie.resolve()
        .then(infoList => {
            return [
                HTTP_CODE.SUCCESS,
                HTTP_MSG.SUCCESS.FOUND,
                infoList.map(item => ({
                    _id: item._id,
                    username: item.username
                }))
            ]
        })
        .catch(error => {
            return error;
        });
}

/** 
 * @description add followId to follow list of user _id
 * @returns [httpCode, httpMsg, data]
 */
exports.post = (listName) => async (_id, followId) => {
    return await User.findOneAndUpdate({ _id }, {
        // addToSet
        $addToSet: { [listName]: followId }
    })
        .then(userInfo => {
            if (userInfo) {
                let field = userInfo[listName];
                // followId not exists yet
                if (field.indexOf(followId) === -1) {
                    // insert followId to list
                    field.push(followId)
                    return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.POST, field]
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

exports.deleteById = (listName) => async (_id, followI) => {
    return await User.findOneAndUpdate({ _id }, {
        $pull: { [listName]: followId }
    })
        // user of _id exists
        .then(userInfo => {
            if (userInfo) {
                let field = userInfo[listName];
                // followId exists
                if (field.indexOf(followId) !== -1) {
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