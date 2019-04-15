const Article = require('../models/article');
const User = require('../models/user')
const { responseClient } = require('../utils/util')

exports.post = (req, res) => {
    let { title, content, authorID } = req.body;
    let article = new Article({ title, content, authorID });

    User.findOne({ _id: authorID })
        .then(userInfo => {
            // 检验用户_id
            if (userInfo) {
                article.save()
                    .then(articleInfo => {
                        // 将articleID插入user信息中
                        let { _id } = articleInfo;
                        User.findOneAndUpdate({ _id: authorID }, { $addToSet: { articles: _id.toString() } })
                            .then(result => {
                                responseClient(res, 200, '文章添加成功', articleInfo);
                            })
                            .catch(err => { throw err; })
                    })
                    .catch(err => { throw err; })
            } else {
                responseClient(res, 404, '文章作者_id不存在');
            }
        })
        .catch(err => {
            responseClient(res);
        })
}

exports.del = (req, res) => {
    let { _id } = req.body;

    Article.findOne({ _id })
        .then(result => {
            if (result) {
                return User.findOneAndUpdate({ _id: result.authorID }, { $pull: { articles: _id } });
            } else {
                responseClient(res, 404, '文章不存在')
            }
        })
        .then(userInfo => {
            let field = userInfo.articles;
            if (field && field.indexOf(_id) === -1) {
                responseClient(res, 404, '文章不存在')
            } else {
                return Article.deleteOne({ _id });
            }
        })
        .then(info => {
            if (info.deletedCount === 1) {
                responseClient(res, 200, '成功删除文章');
            } else {
                responseClient(res, 404, '文章不存在')
            }
        })
        .catch(err => {
            responseClient(res);
        })
}

exports.put = (req, res) => {
    // refresh the article with _id
    let { _id, title, content } = req.body;
    Article.findOneAndUpdate({ _id }, { title, content })
        .then(result => {
            if (result) {
                responseClient(res, 200, '修改成功');
            } else {
                responseClient(res, 404, '文章不存在');
            }
        })
        .catch(err => {
            responseClient(res);
        })
}

// 获取单篇文章信息
exports.get = (req, res) => {
    // 根据params进行查询
    let { userID, _id } = req.query;
    if (userID) {
        // 获取userID的文章列表
        User.findOne({ _id: userID })
            .then(data => {
                if (data) {
                    responseClient(res, 200, '返回文章列表', data.articles)
                } else {
                    responseClient(res, 404, '用户不存在')
                }
            })
    } else {
        Article.findOne({ _id })
            .then(data => {
                if (data) {
                    responseClient(res, 200, '查询成功', data)
                } else {
                    responseClient(res, 404, '文章不存在')
                }
            })
            .catch(err => {
                responseClient(res)
            })
    }
}
