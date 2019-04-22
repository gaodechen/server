const Album = require('../models/album');
const { encode, responseClient } = require('../utils')
const { AUTHOR_TYPE } = require('../constants')

exports.isNotNull = (req, res, next) => {
    let { title, songList } = req.body;
    if (!title) {
        responseClient(res, 401, '专辑名不能为空！');
        return;
    }
    if (!songList) {
        responseClient(res, 401, '歌曲列表不能为空！');
        return;
    }
    next();
}

exports.get = (req, res) => {
    // 根据params进行查询
    let { _id } = req.query;
    Album.findOne({ _id })
        .then(data => {
            if (data) {
                responseClient(res, 200, '查询成功', data)
            } else {
                responseClient(res, 404, '查询失败')
            }
        })
        .catch(err => {
            responseClient(res, 400, '查询失败', err)
        })
}

exports.post = (req, res) => {
    let { title, songList, } = req.body;
    let album = new Album({
        title, songList, styleLabel, emotionLabel, authorType, authorID
    });
    // 尝试插入数据库
    album.save()
        .then(data => {
            responseClient(res, 200, '插入成功', data);
        })
        .catch(err => {
            responseClient(res);
            return;
        });
};

exports.del = (req, res) => {
    let { _id } = req.body;
    Album.deleteOne({ _id })
        .then(result => {
            if (result.n === 1) {
                responseClient(res, 200, '删除成功');
            } else {
                responseClient(res, 404, '专辑不存在');
            }
        })
        .catch(err => {
            responseClient(res);
        });
};

exports.put = (req, res) => {
    // 修改条目
    let { _id, title, songList, styleLabel, emotionLabel, authorType, authorID } = req.body;
    Album.findOneAndUpdate({ _id }, { title, songList, styleLabel, emotionLabel, authorType, authorID })
        .then(result => {
            responseClient(res, 200, '修改成功')
        })
        .catch(err => {
            responseClient(res)
        })
}
