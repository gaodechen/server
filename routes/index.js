const user = require('../controllers/user')
const session = require('../controllers/session')
const auth = require('../controllers/auth')
const music = require('../controllers/music')
const follow = require('../controllers/follow')

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
		.get(session.getSession)
		// 登陆
		.post(session.isNull, session.isValuesNotNull, auth.isPasswordCorrect, session.postSession)
		// 登出
		.delete(session.isNotNull, session.deleteSession)
	
	// user
	app.route('/user')
		.get(session.isNotNull, auth.isSelfAuth, user.getUser)
		// 注册
		.post(user.isValuesNotNull, user.postUser)
		// admin删除用户
		.delete(session.isNotNull, auth.isAdminAuth, user.deleteUser)
		// admin更新用户
		.put(session.isNotNull, auth.isSelfAuth, user.putUser)

	app.route('/admin')
		// admin权限注册admin
		.post(session.isNotNull, auth.isAdminAuth, user.postAdmin)
		.put(session.isNotNull, auth.isAdminAuth, user.putUser)

	app.route('/music')
		// 获取音乐信息
		.get(music.getMusic)
		// 增删乐曲
		.post(session.isNotNull, music.postMusic)
		.delete(session.isNotNull, auth.isAdminAuth, music.deleteMusic)

	app.route('/following')
		.get(follow.getFollow("following"))
		.post(follow.postFollow("following"))
		.delete(follow.deleteFollow("following"))

	app.route('/followers')
		.get(follow.getFollow("followers"))
		.post(follow.postFollow("followers"))
		.delete(follow.deleteFollow("followers"))
};
