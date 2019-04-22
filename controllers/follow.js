const mongoose = require('mongoose')
const User = require('../models/user');
const { responseClient } = require('../utils')

// 添加粉丝需要的权限
exports.hasAuth = (req, res, next) => {
    if(req.session.userInfo._id === req.body.followID) {
        next();
    } else {
        responseClient(res, 403, '操作没有权限');
        return;
    }
}

// schema当中存储id，查询时返回对应id的附加fields
exports.get = (listName) => (req, res) => {
    let { _id } = req.query;
    User.findOne({ _id })
        .then(userInfo => {
            if (userInfo) {
                // 获取_id之外的fields
                let list = userInfo[listName];
                // 获取ObjectID list
                let idList = list.map(item => (
                    new mongoose.Types.ObjectId(item)
                ));
                // list当中的元素一起查询获取array
                User.find({ _id: { $in: idList } })
                    // array中所有结果的promsie.resolve
                    .then(infoList => {
                        responseClient(res, 200, '返回' + listName + '列表', infoList.map(item => (
                            { _id: item._id, username: item.username }
                        )));
                    })
            } else {
                responseClient(res, 404, '用户不存在')
            }
        })
        .catch(err => {
            responseClient(res, 400, '查询失败', err);
        });
}

// 为_id的listName添加元素
exports.post = (listName) => (req, res) => {
    let { _id, followID } = req.body;
    // addToSet去重
    User.findOneAndUpdate({ _id }, { $addToSet: { [listName]: followID } })
        .then(userInfo => {
            // _id用户存在
            if (userInfo) {
                let field = userInfo[listName];
                // followID用户不存在
                if (field.indexOf(followID) === -1) {
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

exports.del = (listName) => (req, res) => {
    let { _id, followID } = req.body;
    // 更新User[_id]的列表字段
    User.findOneAndUpdate({ _id }, { $pull: { [listName]: followID } })
        // _id用户存在
        .then(userInfo => {
            // followID用户存在
            if (userInfo) {
                let field = userInfo[listName];
                if (field.indexOf(followID) !== -1) {
                    responseClient(res, 200, '删除成功', field)
                } else {
                    responseClient(res, 404, '用户不存在')
                }
            } else {
                responseClient(res, 404, '用户不存在')
            }
        })
        .catch(err => {
            responseClient(res);
        });
}
