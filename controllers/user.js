const user = require('../services/user')
const { HTTP_CODE, HTTP_MSG } = require('../constants')
const { responseClient, testId, MD5_encode } = require('../utils')

/**
 * @description check if fields needed are filled in correctly
 */
exports.isNotNull = (req, res, next) => {
    let { email, username, password } = req.body;
    if (!email) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.EMAIL);
        return;
    }
    if (!username) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.USERNAME);
        return;
    }
    if (!password) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.PASSWORD)
    }
    next();
}

/**
 * @description get user by _id
 */
exports.get = (req, res) => {
    let { _id } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    user.findById(_id)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error)
        })
}

/**
 * @description add user & register
 */
exports.post = (req, res) => {
    let { email, username, password, avatar } = req.body;
    let userInfo = { email, username, password, avatar };
    user.register(userInfo)
        .then((packet) => {
            responseClient(res, ...packet)
        })
        .catch((error) => {
            responseClient(res, ...error)
        })
};

/**
 * @description delete user by email
 */
exports.del = (req, res) => {
    let { email } = req.body;
    user.deleteByEmail(email)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error)
        })
};


/**
 * @description update userinfo
 */
exports.put = (req, res) => {
    let { _id, username, password, description, avatar } = req.body;
    let args = { _id, username, password, description, avatar };
    let payload = {};
    Object.keys(args).forEach(key => {
        if(args[key] && typeof(args[key]) !== 'undefined') {
            payload[key] = args[key];
        }
    })
    if (password && typeof(password) !== 'undefined') {
        payload.password = MD5_encode(password);
    }
    user.updateById(_id, payload)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error)
        })
}

/**
 * @description udpate userInfo field in session
 * @param {*} req
 * @param {*} res
 */
exports.putWithSession = (req, res) => {
    let { _id } = req.session.userInfo;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    user.findById(_id)
        .then(packet => {
            Object.assign(req.session.userInfo, { ...packet });
            responseClient(res, ...packet)
        })
}