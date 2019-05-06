const { RECOMMENDER_CREATOR } = require('../config/config');
const articleConfig = RECOMMENDER_CREATOR('article')

let recommender = {
    music: require('raccoon'),
    article: require('raccoon'),
}

recommender['music'].config = RECOMMENDER_CREATOR('music');
recommender['article'].config = RECOMMENDER_CREATOR('article');

exports.recommender = recommender;

/**
 * @description item with likedId of recType is liked by user _id
 * @param {*} payload
 * @returns
 */
exports.liked = async (payload) => {
    const { _id, likedId, recType } = payload;
    return recommender[recType].liked();
}

/**
 * @description item with likedId of recType is unliked by user _id
 * @param {*} payload
 * @returns
 */
exports.unliked = async (payload) => {
    const { _id, likedId, recType }  = payload;
    return recommender[recType].unliked();
}

/**
 * @description get most similar users for user _id
 * @params {*} payload
 */
exports.mostSimilarUsers = async (payload) => {
    const { _id } = payload;
    return recommnder[recType].mostSimilarUsers(_id);
}