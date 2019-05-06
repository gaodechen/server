// types of users
exports.USER_TYPE = {
    USER: 'user',
    ADMIN: 'admin',
}

// HTTP codes
exports.HTTP_CODE = {
    SUCCESS: 200,

    FIELDS_EMPTY: 401,
    REQUEST_FAILED: 401,

    AUTH_ERROR: 403,

    NOT_FOUND: 404,

    SERVER_ERROR: 500,
}

// HTTP messages
exports.HTTP_MSG = {
    SUCCESS: {
        GET: '获取成功',
        POST: '添加成功',
        DELETE: '删除成功',
        UPDATE: '更新成功',
        REGISTER: '注册成功',
        LOGIN: '登陆成功',
        LOGOUT: '注销成功',
        FOUND: '查询成功',
        RECOMMEND: '推荐成功',
        COLLECT: '收藏成功',
        DEFAULT: '请求成功',
        UPLOAD: '上传成功',
    },

    FIELDS_EMPTY: {
        EMAIL: '需要邮箱',
        USERNAME: '需要用户名',
        PASSWORD: '需要密码',
        DEFAULT: '缺少字段',
    },

    REQUEST_FAILED: {
        UPLOAD_FAILED: '上传失败',
        USERINFO_ERROR: '用户信息有误',
        ALREADY_EXISTS: '已经存在',
        DEFAULT: '请求失败',
    },

    AUTH_ERROR: {
        LOGGED_IN: '用户已登录',
        NOT_LOGGED_IN: '未登录',
        NOT_AUTHED: '用户无权限',
    },

    NOT_FOUND: '无法查询到',

    SERVER_ERROR: '服务器错误',
}

// upload modes
exports.UPLOAD_MODE = {
    SINGLE: 'single',
    ARRAY: 'array',
    ANY: "any"
};