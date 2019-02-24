const user = require('../controllers/user')
const session = require('../controllers/session')
const auth = require('../controllers/auth')
const music = require('../controllers/music')
const follow = require('../controllers/follow')
const article = require('../controllers/article')
const recommender = require('../controllers/recommend')
const like = require('../controllers/like')

/**
 * RESTful API
 * 
 * #get: req.query
 * #post: req.body
 */

/**
 * 400: 请求错误
 * 401：不给用户授权/登录失败
 * 403：用户缺少/无权限
 * 404：服务器缺少/无资源
 */

module.exports = app => {
	// session
	app.route('/session')
		// 获取session
		.get(session.get)
		// 登陆
		.post(session.isNull, session.isNotNull, auth.isCorrect, session.post)
		// 登出
		.delete(session.isNotNull, session.del)

	// user
	app.route('/user')
		.get(session.isNotNull, auth.isSelf, user.get)
		// 注册
		.post(user.isNotNull, user.post)
		// admin删除用户
		.delete(session.isNotNull, auth.isAdmin, user.del)
		// admin更新用户
		.put(session.isNotNull, auth.isSelf, user.put)

	app.route('/admin')
		// admin权限注册admin
		.post(session.isNotNull, auth.isAdmin, user.post)
		.put(session.isNotNull, auth.isAdmin, user.put)

	app.route('/music')
		// 获取音乐信息
		.get(music.get)
		// 增删乐曲
		.post(session.isNotNull, music.post)
		.delete(session.isNotNull, auth.isAdmin, music.del)

	app.route('/following')
		.get(follow.get("following"))
		.post(follow.post("following"))
		.delete(follow.del("following"))

	// 粉丝管理
	app.route('/followers')
		.get(follow.get("followers"))
		.post(follow.post("followers"))
		.delete(follow.del("followers"))

	// 文章管理
	app.route('/article')
		.get(article.get)
		.post(session.isNotNull, auth.isSelf, article.post)
		.put(session.isNotNull, auth.isSelf, article.put)
		.delete(session.isNotNull, auth.isSelf, article.del)

	// 推荐
	app.route('/recommend')
		.get(recommender.get)
	
	// 用户收藏管理
	app.route('/like')
		.get(like.get)
		.post(like.post)

};
