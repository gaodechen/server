const Music = require('../models/music');
const { responseClient } = require('../util/util')

exports.postMusic = (req, res) => {
    let { musicName, musicSrc, imgSrc, styleLabel, imgLabel } = req.body;
    //验证用户是否已经在数据库中
    let user = new Music({ musicName, musicSrc, imgSrc, styleLabel, imgLabel });
    // 尝试插入数据库
    user.save()
        .then(data => {
            responseClient(res, 200, '乐曲新建成功', data);
        })
        .catch(err => {
            responseClient(res, 400, '乐曲插入失败', err)
        })
        .catch(err => {
            responseClient(res);
            return;
        });
};

exports.deleteMusic = (req, res) => {
    // 删除给定_id的乐曲
    let { _id } = req.body;
    Music.deleteOne({ _id })
        .then(result => {
            if (result.n === 1) {
                responseClient(res, 200, '乐曲删除成功');
            } else {
                responseClient(res, 404, '乐曲不存在');
            }
        })
        .catch(err => {
            responseClient(res);
        });
};

exports.putMusic = (req, res) => {
    // 更新给定_id的乐曲
    let { musicName, musicSrc, imgSrc, styleLabel, imgLabel } = req.body;
    Music.findOneAndUpdate({ _id }, { musicName, musicSrc, imgSrc, styleLabel, imgLabel })
        .then(result => {
            responseClient(res, 200, '修改成功')
        })
        .catch(err => {
            responseClient(res)
        })
}

exports.getMusic = (req, res) => {
    // 根据params进行查询
    let { _id } = req.query;
    Music.findOne({ _id })
        .then(data => {
            if (data) {
                responseClient(res, 200, '查询成功', data)
            } else {
                responseClient(res, 404, '乐曲不存在')
            }
        })
        .catch(err => {
            responseClient(res, 400, '查询失败', err)
        })
}