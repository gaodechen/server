const User = require('../models/user');
const { MD5_encode } = require('../utils')
const { USER_TYPE, HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description find user in database by _id
 * @param {ObjectId} _id
 * @returns: Promise.resolve([code, msg, data of user found])
 *           or Promise.reject([code, msg])
 */
exports.findById = async (_id) => {
    return await User.findById(_id)
        .then(data => {
            if (data) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.FOUND, data];
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND];
            }
        })
        .catch(error => {
            throw error;
        })
}

/**
 * @description add user to database
 * @param {*} ...userInfo
 * @returns: Promise.resolve([code, msg, data of user])
 *           or Promise.reject([code, msg])
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
            return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.REGISTER, data];
        })
        .catch((error) => {
            throw error;
        })
}

/**
 * @description delete user from database
 * @param {string} email
 * @returns: Promise.resolve([code, msg])
 *           or Promise.reject([code, msg])
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
 * @description update userinfo in database
 * @param {*} ...userinfo
 * @returns: Promise.resolve([code, msg])
 *           or Promise.reject([code, msg])
 */
exports.updateByEmail = async (email, userInfo) => {
    return await User.findOneAndUpdate({ email }, { ...userInfo })
        .then(result => {
            return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.UPDATE];
        })
        .catch(error => {
            throw error;
        })
}