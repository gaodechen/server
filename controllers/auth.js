const auth = require('../services/auth')
const { getPacketData, responseClient } = require('../utils')
const { USER_TYPE, HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description check user email & password
 */
exports.verify = (req, res, next) => {
    let userInfo = { email, password } = req.body;
    auth.verify(userInfo)
        .then((packet) => {
            next(getPacketData(packet));
        })
        .catch((error) => {
            responseClient(res, ...error);
        });
}

/**
 * @description check if user is admin
 */
exports.isAdmin = (req, res, next) => {
    // has logged in
    if (req.session.userInfo.type != USER_TYPE.ADMIN) {
        responseClient(res, HTTP_CODE.AUTH_ERROR, HTTP_MSG.AUTH_ERROR.NOT_AUTHED);
    } else {
        next();
    }
}

/**
 * @description check if the given user has auth to operate
 */
exports.isSelf = (req, res, next) => {
    const { type, email } = req.session.userInfo;
    if (type != USER_TYPE.ADMIN && email != req.body.email) {
        responseClient(res, HTTP_CODE.AUTH_ERROR, HTTP_MSG.AUTH_ERROR.NOT_AUTHED);
    } else {
        next();
    }
}
