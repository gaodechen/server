const artist = require('../models/artist');
const { encode, responseClient } = require('../util/util')
const { USER_TYPE } = require('../constants')

exports.isNotNull = (req, res, next) => {
    let { artistName } = req.body;
    if (!artistName) {
        responseClient(res, 401, '名称不可为空');
        return;
    }
    next();
}

exports.get = (req, res) => {
    // 根据params进行查询
    let { _id } = req.query;
    artist.findOne({ _id })
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
    let { artistName, styleLabel, emotionLable, avatar } = req.body;
    //验证用户是否已经在数据库中
    let artist = new artist({
        email, artistName, password: encode(password), type: USER_TYPE.USER, avatar
    });
    // 尝试插入数据库
    artist.save()
        .then(data => {
            responseClient(res, 200, '添加成功', data);
        })
        .catch(err => {
            responseClient(res);
            return;
        });
};

exports.del = (req, res) => {
    let { _id } = req.body;
    artist.deleteOne({ _id })
        .then(result => {
            if (result.n === 1) {
                responseClient(res, 200, '删除成功');
            } else {
                responseClient(res, 404, '艺术家不存在');
            }
        })
        .catch(err => {
            responseClient(res);
        });
};

exports.put = (req, res) => {
    // 给定_id修改条目
    let { _id, artistName, styleLabel, emotionLabel, avatar } = req.body;
    artist.findOneAndUpdate({ _id }, { artistName, styleLabel, emotionLabel, avatar })
        .then(result => {
            responseClient(res, 200, '修改成功')
        })
        .catch(err => {
            responseClient(res)
        })
}
