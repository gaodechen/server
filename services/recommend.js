const { recommender } = require('../lib/recommender')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description give recommendations for user with _id
 * @param {ObjectId} payload._id userId of user recommended for
 * @param {number} payload.recNum number of items for recommendation
 * @param {string} payload.recType type of recommendation items
 * @returns
 */
exports.recommend = async (payload) => {
    const { _id, recNum, recType } = payload;
    return await recommender[recType].recommendFor(_id, recNum)
        .then(recs => {
            return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.RECOMMEND, recs];
        })
        .catch(error => {
            return [];
        })
}
