const { responseClient } = require('../utils')
const rec = require('../services/recommend')

/**
 * @description give recommendations of recType [music or article] for user _id
 * @param {*} req
 * @param {*} res
 */
exports.get = (req, res) => {
    const payload = { _id, recNum, recType } = req.query;
    rec.recommend(payload)
        .then(packet => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
}
