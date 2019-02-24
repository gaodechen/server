const crypto = require('crypto')

const MD5_SUFFIX = 'aaabccccddddeeffffqqq*&^%$#'

MD5 = (pwd) => {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
}

encode = (pwd) => {
    return MD5(pwd + MD5_SUFFIX)
}

responseClient = (res, httpCode = 500, message = '服务端异常', data = {}) => {
    let resData = {};
    resData.message = message;
    resData.data = data;
    res.status(httpCode).json(resData);
}

// 时间 格式化成 2018-12-12 12:12:00
timestampToTime = (timestamp) => {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}

/**
 * Normalize a port into a number, string, or false.
 */
normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


module.exports = {
    MD5_SUFFIX,
    MD5,
    encode,
    responseClient,
    timestampToTime,
    normalizePort,
};

