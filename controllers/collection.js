const { responseClient, testId } = require('../utils')
const collection = require('../services/collection')

/**
 * @description get collection[likedType] by _id
 */
exports.get = (req, res) => {
    let { _id, likedType } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    collection.findById(likedType)(_id)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}

/**
 * @description post collectionId to collection[likedType] of user _id
 */
exports.post = (req, res) => {
    let { _id, collectionId, likedType } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    collection.post(likedType)(_id, collectionId)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
};

/**
 * @description delete collectionId in collection[likedType] of user _id
 */
exports.del = (req, res) => {
    let { _id, collectionId, likedType } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    collection.deleteById(likedType)(_id, collectionId)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}
