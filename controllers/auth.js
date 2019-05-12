const auth = require('../services/auth')
const { getPacketData, responseClient, testId } = require('../utils')
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
 * @description check if the given user with given id field has auth to operate
 * @params field: name of _id field
 */
exports.isSelf = (field = "_id") => (req, res, next) => {
    const { type, currentId } = req.session.userInfo;
    if (req.body && req.body[field]) {
        const requestId = req.body[field];
        if (type != USER_TYPE.ADMIN && currentId !== requestId) {
            responseClient(res, HTTP_CODE.AUTH_ERROR, HTTP_MSG.AUTH_ERROR.NOT_AUTHED);
        } else {
            next();
        }
    } else {
        reponseClient(res, HTTP_CODE.AUTH_ERROR, HTTP_MSG.AUTH_ERROR.NOT_AUTHED)
    }
}
