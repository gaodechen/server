const recommender = require('../lib/recommender')
const { responseClient } = require('../util/util')

// _id: 为用户_id进行乐曲推荐
// _recNum: 推荐乐曲的数量
exports.get = (req, res) => {
    const { _id, recNum, recType } = req.query;

    // recommender[recType]
    recommender.recommendFor(_id, recNum)
        .then(recs => {
            responseClient(res, 200, '返回推荐列表', recs)
        })
        .catch(err => {
            responseClient(res);
        })
}
