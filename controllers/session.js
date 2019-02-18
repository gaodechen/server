const User = require('../models/user');
const { encode, responseClient } = require('../util/util')

// needed session null
exports.isNull = (req, res, next) => {
    if (req.session.userInfo) {
        responseClient(res, 400, '已经登陆');
        return;
    }
    next();
}

// needed seesion
exports.isNotNull = (req, res, next) => {
    if (!req.session.userInfo) {
        responseClient(res, 401,  '尚未登陆');
        return;
    }
    next();
}

// is email and password for login
exports.isValuesNotNull = (req, res, next) => {
    let { email, password } = req.body;
    if (!email) {
        responseClient(res, 401, '用户邮箱不可为空')
        return;
    }
    if (!password) {
        responseClient(res, 401, '密码不可为空')
        return;
    }
    next();
}

// post session, login
exports.postSession = (userInfo, req, res, next) => {
    req.session.userInfo = userInfo;
    responseClient(res, 200, '登录成功', userInfo);
}

// get session
exports.getSession = (req, res) => {
    if(req.session.userInfo) {
        responseClient(res, 200, '认证成功', req.session.userInfo)
    } else {
        responseClient(res, 404, '认证失败')
    }
}

// delete session, logout
exports.deleteSession = (req, res) => {
    // delete session
    req.session.userInfo = null;
    responseClient(res, 200, '登出成功！');
};
