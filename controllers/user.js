const user = require('../services/user')
const auth = require('../services/auth')
const { HTTP_CODE, HTTP_MSG } = require('../constants')
const { responseClient } = require('../utils')

/**
 * @description check if fields needed are filled in correctly
 */
exports.isNotNull = (req, res, next) => {
    let { email, username, password } = req.body;
    if (!email) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.EMAIL);
        return;
    }
    if (!username) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.USERNAME);
        return;
    }
    if (!password) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.PASSWORD)
    }
    next();
}

/**
 * @description get user by _id
 */
exports.get = (req, res) => {
    let { _id } = req.body;
    user.findById(_id)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error)
        })
}

/**
 * @description add user & register
 */
exports.post = (req, res) => {
    let userInfo = { email, username, password, avatar } = req.body;
    user.register(userInfo)
        .then((packet) => {
            responseClient(res, ...packet)
        })
        .catch((error) => {
            responseClient(res, ...error)
        })
};

/**
 * @description delete user by email
 */
exports.del = (req, res) => {
    let { email } = req.body;
    user.deleteByEmail(email)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error)
        })
};


/**
 * @description update userinfo
 */
exports.put = (req, res) => {
    let email = { email } = req.body;
    let userInfo = { username, password, avatar } = req.body;
    user.updateByEmail(email, userInfo)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error)
        })
}

/**
 * @description udpate userInfo field in session
 * @param {*} req
 * @param {*} res
 */
exports.putWithSession = (req, res) => {
    let { _id } = req.session.userInfo;
    user.findById(_id)
        .then(packet => {
            Object.assign(req.session.userInfo, { ...packet });
            responseClient(res, ...packet)
        })
}