const { responseClient, testId } = require('../utils')
const article = require('../services/articles')

/**
 * @description post article
 * @param {*} req
 * @param {*} res
 */
exports.post = (req, res) => {
    let payload = { title, content, authorId } = req.body;
    if (!testId(authorId)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    article.post(payload)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}

/**
 * @description delete articles of _id
 * @param {*} req
 * @param {*} res
 */
exports.del = (req, res) => {
    let { _id } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    article.deleteById(_id)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}

/**
 * @description update an article of _id
 * @param {*} req
 * @param {*} res
 */
exports.put = (req, res) => {
    // refresh the article with _id
    let payload = { _id, title, content } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    article.updateById(payload)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}

/**
 * @description get article information
 * @param {*} req
 * @param {*} res
 */
exports.get = (req, res) => {
    let { _id } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    article.findById(_id)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}

/**
 * @description get article list of userId
 * @param {*} req
 * @param {*} res
 */
exports.getList = (req, res) => {
    let { userId } = req.body;
    if (!testId(userId)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    article.getListByUserId(userId)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}