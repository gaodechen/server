const recommender = require('../lib/recommender')
const { responseClient } = require('../util/util')

exports.get = (req, res) => {
    const { _id } = req.query;
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
