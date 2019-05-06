const Article = require('../models/article');
const User = require('../models/user')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description post an article with payload
 * @param {*} payload
 * @returns
 */
exports.post = async (payload) => {
    let { authorId } = payload;
    return await User.findById(authorId)
        .then(userInfo => {
            if (userInfo) {
                return new Article(payload).save();
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .then(articleInfo => {
            let { _id } = articleInfo;
            return User.findOneAndUpdate({ _id: authorId }, { $addToSet: { articles: _id.toString() } });
        })
        .then(userInfo => {
            return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.POST, userInfo.articles];
        })
        .catch(error => {
            throw error;
        })
}

/**
 * @description delete an article from database
 * @param {*} _id
 * @returns
 */
exports.deleteById = async (_id) => {
    return await Article.findOne({ _id })
        .then(result => {
            if (result) {
                return User.findOneAndUpdate({ _id: result.authorId }, { $pull: { articles: _id } });
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .then(userInfo => {
            let field = userInfo.articles;
            if (field && field.indexOf(_id) === -1) {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            } else {
                return Article.deleteOne({ _id });
            }
        })
        .then(info => {
            if (info.deletedCount === 1) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.DELETE]
            } else {
                throw [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            throw error;
        })
}

/**
 * @description get information of an article from database
 * @param {*} _id
 */
exports.findById = async (_id) => {
    return await Article.findOne({ _id })
        .then(data => {
            if (data) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.FOUND, data]
            } else {
                return [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND]
            }
        })
        .catch(error => {
            throw error;
        })
}

/**
 * @description get article list of userId
 * @param {*} userId
 */
exports.getListByUserId = async (userId) => {
    return await User.findById(userId)
        .then(data => {
            if (data) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.GET, data.articles]
            } else {
                return [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND];
            }
        })
        .catch(error => {
            throw [];
        })
}

/**
 * @description update an article of _id with payload
 * @param {*} payload
 * @returns
 */
exports.updateById = async (payload) => {
    let { _id, ..._payload } = payload;
    return await Article.findOneAndUpdate({ _id }, { ..._payload })
        .then(result => {
            if (result) {
                return [HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.UPDATE];
            } else {
                return [HTTP_CODE.NOT_FOUND, HTTP_MSG.NOT_FOUND];
            }
        })
        .catch(error => {
            return [];
        })
}