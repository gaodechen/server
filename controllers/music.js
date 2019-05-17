const music = require('../services/music')
const { responseClient, testId } = require('../utils')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

/**
 * @description post music with musicInfo
 */
exports.post = (req, res) => {
    let musicInfo = { title, src, lyric, authorId, thumbnail, refBegin, refEnd, createTime, updateTime, } = req.body;
    /* if (!testId(authorId)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    } */
    if(!title || !src) {
        responseClient(res, HTTP_CODE.FIELDS_EMPTY, HTTP_MSG.FIELDS_EMPTY.DEFAULT);
    }
    music.post(musicInfo)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch(error => {
            responseClient(res, ...error);
        })
};

/**
 * @description find music by music _id
 */
exports.get = (req, res) => {
    let { _id } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    music.findById(_id)
        .then((packet) => {
            responseClient(res, ...packet)
        })
        .catch((error) => {
            responseClient(res, ...error);
        })
}

/**
 * @description delete music with music _id
 */
exports.del = (req, res) => {
    let { _id } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    music.deleteById(_id)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error);
        })
};

/**
 * @description update music by _id
 * @param {*} req
 * @param {*} res
 */
exports.put = (req, res) => {
    let _id = { _id } = req.body;
    if (!testId(_id)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    let musicInfo = { title, src, lyric, thumbnail, refBegin, refEnd, createTime, updateTime,  } = req.body;
    music.updateById(_id, musicInfo)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error);
        })
}

/**
 * @description get music list of userId
 * @param {*} req
 * @param {*} res
 */
exports.getList = (req, res) => {
    let { userId } = req.body;
    if (!testId(userId)) {
        responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.ARGV_ERROR)
    }
    music.getListByUserId(userId)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error);
        })
}