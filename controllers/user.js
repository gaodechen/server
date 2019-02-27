const User = require('../models/user');
const { encode, responseClient } = require('../util/util')
const { USER_TYPE } = require('../constants')

exports.isNotNull = (req, res, next) => {
    let { email, username, password } = req.body;
    if (!email) {
        responseClient(res, 401, '用户邮箱不可为空');
        return;
    }
    if (!username) {
        responseClient(res, 401, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 401, '密码不可为空');
        return;
    }
    next();
}

exports.get = (req, res) => {
    // 根据params进行查询
    let { _id } = req.query;
    User.findOne({ _id })
        .then(data => {
            if (data) {
                responseClient(res, 200, '查询成功', data)
            } else {
                responseClient(res, 404, '查询失败')
            }
        })
        .catch(err => {
            responseClient(res, 400, '查询失败', err)
        })
}

exports.post = (req, res) => {
    let { email, username, password, avatar } = req.body;
    //验证用户是否已经在数据库中
    User.findOne({ email: email })
        .then(data => {
            if (data) {
                responseClient(res, 401, '用户邮箱已存在！');
                return;
            }
            let user = new User({
                email, username, password: encode(password), type: USER_TYPE.USER, avatar
            });
            // 尝试插入数据库
            user.save()
                .then(data => {
                    responseClient(res, 200, '注册成功', data);
                })
                .catch(err => {
                    responseClient(res, 401, '注册失败，请检查输入信息', err)
                })
        })
        .catch(err => {
            responseClient(res);
            return;
        });
};

exports.del = (req, res) => {
    let { email } = req.body;
    User.deleteOne({ email })
        .then(result => {
            if (result.n === 1) {
                responseClient(res, 200, '用户删除成功');
            } else {
                responseClient(res, 404, '用户不存在');
            }
        })
        .catch(err => {
            responseClient(res);
        });
};

exports.put = (req, res) => {
    // 给定email修改条目
    let { email, username, password, avatar } = req.body;
    User.findOneAndUpdate({ email }, { username, password, avatar })
        .then(result => {
            responseClient(res, 200, '修改成功')
        })
        .catch(err => {
            responseClient(res)
        })
}

/* exports.getList = (req, res) => {
    let keyword = req.query.keyword || '';
    let pageNum = parseInt(req.query.pageNum) || 1;
    let pageSize = parseInt(req.query.pageSize) || 10;
    let conditions = {};
    if (keyword) {
        const reg = new RegExp(keyword, 'i');
        conditions = { $or: [{ username: { $regex: reg } }, { email: { $regex: reg } }] };
    }
    let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
    let responseData = {
        count: 0,
        list: [],
    };

    User.countDocuments(conditions, (err, count) => {
        if (err) {
            console.error('Error:' + err);
        } else {
            responseData.count = count;
            // 待返回的字段
            let fields = {
                _id: 1,
                email: 1,
                username: 1,
                avatar: 1,
                phone: 1,
                introduce: 1,
                type: 1,
                create_time: 1,
            };
            let options = {
                skip: skip,
                limit: pageSize,
                sort: { create_time: -1 },
            };
            User.find(conditions, fields, options, (error, result) => {
                if (err) {
                    console.error('Error:' + error);
                    // throw error;
                } else {
                    responseData.list = result;
                    responseClient(res, 200, 0, 'success', responseData);
                }
            });
        }
    });
}; */
