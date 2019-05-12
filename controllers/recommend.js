const { responseClient, testId } = require('../utils')
const rec = require('../services/recommend')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description give recommendations of recType [music or article] for user _id
 * @param {*} req
 * @param {*} res
 */
exports.get = (req, res) => {
    const { _id, recNum, recType } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    const payload = { _id, recNum, recType};
    if(!recNum || !recType) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.DEFAULT)
    }
    rec.recommend(payload)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}
