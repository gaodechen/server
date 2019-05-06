const { responseClient } = require('../utils')
const rec = require('../services/recommend')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description give recommendations of recType [music or article] for user _id
 * @param {*} req
 * @param {*} res
 */
exports.get = (req, res) => {
    const { _id, recNum, recType } = req.body;
    const payload = { _id, recNum, recType};
    if(!_id || !recNum) {
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
