const User = require('../models/user');
const { responseClient } = require('../util/util')

exports.getFollow = (listName) => (req, res) => {
    let { _id } = req.query;
    User.findOne({ _id })
        .then(data => {
            if (data) {
                responseClient(res, 200, '返回following列表', data.following);
            } else {
                responseClient(res, 404, '用户不存在')
                return;
            }
        })
        .catch(err => {
            responseClient(res, 400, '查询失败', err);
        });
}

// 为_id的listName添加元素
exports.postFollow = (listName) => (req, res) => {
    let { _id, followID } = req.body;
    // addToSet去重
    User.findOneAndUpdate({ _id }, { $addToSet: { [listName]: followID } })
        .then(userInfo => {
            // _id用户存在
            if(userInfo) {
                let field = userInfo[listName];
                console.log(field)
                // followID用户不存在
                if(field.indexOf(followID) === -1) {
                    field.push(followID)
                    responseClient(res, 200, '添加成功', field)
                } else {
                    responseClient(res, 400, '用户已存在', field)
                }
            } else {
                responseClient(res, 404, '用户不存在')
            }
        })
        .catch(err => {
            responseClient(res);
        });
};

exports.deleteFollow = (listName) => (req, res) => {
    let { _id, followID } = req.body;
    // 更新User[_id]的列表字段
    User.findOneAndUpdate({ _id }, { $pull: { [listName]: followID } })
        // _id用户存在
        .then(userInfo => {
            // followID用户存在
            let field = userInfo[listName];
            if (userInfo && field.indexOf(followID) !== -1) {
                responseClient(res, 200, '删除成功', field)
            } else {
                responseClient(res, 404, '用户不存在', field)
            }
        })
        .catch(err => {
            responseClient(res);
        });
}
