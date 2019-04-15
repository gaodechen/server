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
 * 400: request error
 * 401：auth error / failed to login
 * 403：no permission
 * 404：no resource
 */

module.exports = app => {
	// session
	app.route('/session')
		// 获取session
		.get(session.get)
		// 登陆
		.post(session.isNull, session.isInfoNotNull, auth.isCorrect, session.post)
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

	// 管理员
	app.route('/admin')
		// admin权限注册admin
		.post(session.isNotNull, auth.isAdmin, user.post)
		.put(session.isNotNull, auth.isAdmin, user.put)

	// 艺术家
	app.route('/user')
		.get(session.isNotNull, auth.isSelf, user.get)
		.post(user.isNotNull, user.post)
		.delete(session.isNotNull, auth.isAdmin, user.del)
		.put(session.isNotNull, auth.isSelf, user.put)


	// 乐曲
	app.route('/music')
		// 获取音乐信息
		.get(music.get)
		// 增删乐曲
		.post(session.isNotNull, music.post)
		.delete(session.isNotNull, auth.isAdmin, music.del)

	// 关注管理
	app.route('/following')
		.get(follow.get("following"))
		.post(session.isNotNull, auth.isSelf, follow.post("following"))
		.delete(session.isNotNull, auth.isSelf, follow.del("following"))

	// 粉丝管理
	app.route('/followers')
		.get(follow.get("followers"))
		// 添加粉丝需要关注者的权限
		.post(session.isNotNull, follow.hasAuth, follow.post("followers"))
		// 删除粉丝需要被关注者的权限
		.delete(session.isNotNull, auth.isSelf, follow.del("followers"))

	// 文章管理
	app.route('/article')
		.get(article.get)
		.post(session.isNotNull, auth.isSelf, article.post)
		.put(session.isNotNull, auth.isSelf, article.put)
		.delete(session.isNotNull, auth.isSelf, article.del)

	// 推荐 Songs / Users
	app.route('/recommend')
		.get(recommender.get)
	
	// 用户收藏管理
	app.route('/like')
		.get(like.get)
		.post(session.isNotNull, auth.isSelf, like.post)
		.put(session.isNotNull, auth.isSelf, like.put)

};
