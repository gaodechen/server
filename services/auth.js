const User = require('../models/user');
const { MD5_encode } = require('../utils')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description check email & password in database
 * @param {*} userInfo
 * @returns promise.resolve([code, msg, data of user])
 *          or promise.reject([code, msg])
 */
exports.verify = async function (userInfo) {
    let { email, password } = userInfo;

    return await User.findOne({
        email
    })
        .then(data => {
            if (data) {
                if (data.password == MD5_encode(password)) {
                    return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.DEFAULT, data]
                } else {
                    throw [HTTP_CODE.REQUEST_FAILIED, HTTP_MSG.REQUEST_FAILED.USERINFO_ERROR];
                }
            } else {
                throw [HTTP_CODE.REQUEST_FAILIED, HTTP_MSG.REQUEST_FAILED.USERINFO_ERROR];
            }
        })
        .catch(error => {
            throw error;
        });
}
