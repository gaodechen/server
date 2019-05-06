const { responseClient } = require('../utils')
const collection = require('../services/collection')

/**
 * @description get user collection list
 * @param {*} req
 * @param {*} res
 */
exports.get = (req, res) => {
    const { _id } = req.query;
    collection.getCollection(_id)
        .then(packet => {
            responseClient(res, ...packet)
        })
        .catch(error => {
            responseClient(res, ...error)
        })
}

/**
 * @description add music id to user collection, both mongodb & redis
 * @param {*} req
 * @param {*} res
 */
exports.post = (req, res) => {
    const { _id, likedId } = req.body;
    collection.addToCollection(_id, likedId)
        .then(packet => {
            responseClient(res, ...packet)
        })
        .catch(error => {
            responseClient(res, ...error)
        })
}

exports.put = (req, res) => {
    const { _id, likedList } = req.body;
    User.findOneAndUpdate({_id}, {collections: likedList})
        .then(data => {
            if(data) {
                responseClient(res, 200, '喜好更新成功');
            } else {
                responseClient(res, 404, '用户不存在');
            }
        })
        .catch(err => {
            responseClient(res);
        })
}