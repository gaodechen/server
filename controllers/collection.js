const { responseClient } = require('../utils')
const collection = require('../services/collection')

/**
 * @description get collection[likedType] by _id
 */
exports.get = (req, res) => {
    let { _id, likedType } = req.body;
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
    collection.deleteById(likedType)(_id, collectionId)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}
