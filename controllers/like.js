const recommender = require('../lib/recommender')
const User = require('../models/user')
const { responseClient } = require('../utils')

exports.get = (req, res) => {
    const { _id } = req.query;
    User.findOne({ _id })
        .then(data => {
            if(data) {
                let field = data.collections;
                responseClient(res, 200, '返回收藏列表', )
            } else {
                responseClient(res, 404, '用户不存在')
            }
        })
        .catch(err => {
            responseClient(res)
        })
}

exports.post = (req, res) => {
    const { _id, likedID } = req.body;
    recommender.liked(_id, likedID)
        .then(() => {
            responseClient(res, 200, '喜好记录成功');
        })
        .catch(() => {
            responseClient(res);
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