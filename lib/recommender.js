const { RECOMMENDER_CREATOR } = require('../config/config');
const articleConfig = RECOMMENDER_CREATOR('article')

musicRecConfig = RECOMMENDER_CREATOR('music');
albumRecConfig = RECOMMENDER_CREATOR('album');
articleRecConfig = RECOMMENDER_CREATOR('article');

module.exports = {
    musicRec,
    articleRec,
    albumRec
};