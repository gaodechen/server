const { HTTP_CODE, HTTP_MSG } = require('../constants')

exports.responseClient = (res, httpCode = HTTP_CODE.SERVER_ERROR, message = HTTP_MSG.SERVER_ERROR, data = {}) => {
    let resData = {};
    resData.message = message;
    resData.data = data;
    res.status(httpCode).json(resData);
}
