const timeout = require('connect-timeout');

exports.timeout = timeout;

/**
 * @description halt when timeout
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.timeoutHalter = function (req, res, next) {
    if (!req.timeout)
        next();
}