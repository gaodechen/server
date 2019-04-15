const user = require('../services/user')
const { encode, responseClient } = require('../utils/md5')

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
    let { _id } = req.query;
    responseClient(res, user.find());
}

exports.post = (req, res) => {
    let { email, username, password, avatar } = req.body;
    //验证用户是否已经在数据库中
    User.findOne({ email })
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
