const { responseClient, testId } = require('../utils')
const { HTTP_CODE, HTTP_MSG } = require('../constants')
const follow = require('../services/follow')

/**
 * Currying Functions
 * (listName) => (req, res) => { services... }
 */

/**
 * @description auth to add followers
 */
exports.hasAuth = (req, res, next) => {
    if (req.session.userInfo._id === req.body.followId) {
        next();
    } else {
        responseClient(res, HTTP_CODE.AUTH_ERROR, HTTP_MSG.AUTH_ERROR.NOT_AUTHED);
    }
}

/**
 * @description get follow[listName] by _id
 */
exports.get = (listName) => (req, res) => {
    let { _id } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    follow.findById(listName)(_id)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}

/**
 * @description post followId to follow[listName] of user _id
 */
exports.post = (listName) => (req, res) => {
    let { _id, followId } = req.body;
    if (!testId(_id) || !testId(followId)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    follow.post(listName)(_id, followId)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
};

/**
 * @description delete followId in follow[listName] of user _id
 */
exports.del = (listName) => (req, res) => {
    let { _id, followId } = req.body;
    if (!testId(_id) || !testId(followId)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    follow.deleteById(listName)(_id, followId)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}
