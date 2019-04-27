const music = require('../services/music')
const { responseClient } = require('../utils')

/**
 * @description post music with musicInfo
 */
exports.post = (req, res) => {
    let musicInfo = { title, src, lyric, thumbnail, refrainBeginingTime, refrainEndTime, createTime, updateTime, } = req.body;
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
    let { _id } = req.query;
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
    music.deleteByID(_id)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error);
        })
};

exports.put = (req, res) => {
    let _id = { _id } = req.body;
    let musicInfo = { title, src, lyric, thumbnail, refrainBeginingTime, refrainEndTime, createTime, updateTime,  } = req.body;
    music.putById(_id, musicInfo)
        .then((packet) => {
            responseClient(res, ...packet);
        })
        .catch((error) => {
            responseClient(res, ...error);
        })
}
