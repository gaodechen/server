const { responseClient } = require('../utils')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description verify if session is null
 */
exports.isNull = (req, res, next) => {
    if (req.session.userInfo) {
        // if already logged in
        responseClient(res, HTTP_CODE.AUTH_ERROR, HTTP_MSG.AUTH_ERROR.LOGGED_IN);
        return;
    }
    next();
}

/**
 * @description check if session is not null
 */
exports.isNotNull = (req, res, next) => {
    if (!req.session.userInfo) {
        responseClient(res, HTTP_CODE.AUTH_ERROR,  HTTP_MSG.AUTH_ERROR.NOT_LOGGED_IN);
        return;
    }
    next();
}

/**
 * @description check if user information fields are not empty
 */
exports.isInfoNotNull = (req, res, next) => {
    let { email, password } = req.body;
    if (!email) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.EMAIL)
        return;
    }
    if (!password) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.PASSWORD)
        return;
    }
    next();
}

/**
 * @description log in
 */
exports.post = (userInfo, req, res, next) => {
    req.session.userInfo = userInfo;
    responseClient(res, HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.LOGIN, userInfo);
}

/**
 * @description get session
 */
exports.get = (req, res) => {
    if(req.session.userInfo) {
        responseClient(res, HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.FOUND, req.session.userInfo)
    } else {
        responseClient(res, HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND)
    }
}

/**
 * @description delete session
 */
exports.del = (req, res) => {
    // delete session
    req.session.userInfo = null;
    responseClient(res, HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.LOGOUT);
};