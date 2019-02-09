const user = require('../controllers/user')
const session = require('../controllers/session.js')
const auth = require('../controllers/auth')

/**
 * RESTful API
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
		.post(session.verifySessionNull, session.verifyValuesNotNull, auth.verifyPassword, session.postSession)
		// 登出
		.delete(session.verifySessionNotNull, session.deleteSession)
	
	// user
	app.route('/user')
		// 注册
		.post(user.verifyValuesNotNull, user.postUser)
		// admin删除用户
		.delete(session.verifySessionNotNull, auth.verifyAdminAuth, user.deleteUser)
		// admin更新用户
		.put(session.verifySessionNotNull, auth.verifyPutAuth, user.putUser)

	app.route('/admin')
		// admin注册admin
		.post(session.verifySessionNotNull, auth.verifyAdminAuth, user.postAdmin)
		.put(session.verifySessionNotNull, auth.verifyAdminAuth, user.putUser)

};
