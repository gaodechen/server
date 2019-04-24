const User = require('../models/user');
const { MD5_encode } = require('../utils')
const { USER_TYPE, HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description: find user in database by _id
 * @param {ObjectId} _id
 * @returns: Promise.resolve(packet) / Promise.reject(packet)
 */
exports.findById = async (_id) => {
    return await User.findOne({ _id })
        .then(data => {
            if (data) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS, data];
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND];
            }
        })
        .catch(error => {
            throw error;
        })
}

/**
 * @description: add user to database
 * @param {*} ...userInfo
 * @returns: Promise.resolve(packet) / Promise.reject(packet)
 */
exports.register = async (userInfo) => {
    const { email, username, password, avatar } = userInfo;
    return await User.findOne({ email })
        .then(data => {
            if (data) {
                throw [HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ALREADY_EXISTS];
            } else {
                let user = new User({
                    email, username, password: MD5_encode(password), type: USER_TYPE.USER, avatar
                })
                return user.save()
            }
        })
        .then((data) => {
            return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.POST, data];
        })
        .catch((error) => {
            throw error;
        })
}

/**
 * @description: delete user from database
 * @param {string} email
 * @returns: Promise.resolve(packet) / Promise.reject(packet)
 */
exports.deleteByEmail = async (email) => {
    return await User.deleteOne({ email })
        .then(result => {
            if (result.n === 1) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.DELETE];
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            throw error;
        });
}

/**
 * @description: update userinfo in database
 * @param {*} ...userinfo
 * @returns: Promise.resolve(packet) / Promise.reject(packet)
 */
exports.update = async (userInfo) => {
    let { email, username, password, avatar } = userInfo;
    return await User.findOneAndUpdate({ email }, { username, password, avatar })
        .then(result => {
            return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.UPDATE]
        })
        .catch(error => {
            throw error;
        })
}