const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description set response for client
 */
exports.responseClient = (res, httpCode = HTTP_CODE.SERVER_ERROR, message = HTTP_MSG.SERVER_ERROR, data = {}) => {
    let resData = {};
    resData.message = message;
    resData.data = data;
    res.status(httpCode).json(resData);
}

exports.getPacketCode = (packet) => {
    return packet[0];
}

exports.getPacketMsg = (packet) => {
    return packet[1];
}

exports.getPacketData = (packet) => {
    return packet[2];
}