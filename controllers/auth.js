const User = require('../models/user');
const { encode, responseClient } = require('../util/util')
const { USER_TYPE } = require('../constants')

// 数据库核对密码
exports.isPasswordCorrect = (req, res, next) => {
    const { email, password } = req.body
    User.findOne({
        email
    })
        .then(userInfo => {
            if (userInfo) {
                if (userInfo.password == encode(password)) {
                    next(userInfo);
                } else {
                    responseClient(res, 401, '用户名或者密码错误');
                }
            } else {
                responseClient(res, 401, '用户不存在')
            }
        })
        .catch(err => {
            responseClient(res);
        });
}

// 验证是否admin
exports.isAdminAuth = (req, res, next) => {
    if (req.session.userInfo.type != USER_TYPE.ADMIN) {
        responseClient(res, 403, '用户没有权限');
    } else {
        next();
    }
}

// 验证是否admin或者用户自身
exports.isSelfAuth = (req, res, next) => {
    const { type, email } = req.session.userInfo;
    if (type != USER_TYPE.ADMIN && email != req.body.email) {
        responseClient(res, 403, '用户没有权限');
    } else {
        next();
    }
}
