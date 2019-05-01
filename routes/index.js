const user = require('../controllers/user')
const session = require('../controllers/session')
const auth = require('../controllers/auth')
const music = require('../controllers/music')
const follow = require('../controllers/follow')
const article = require('../controllers/article')
const file = require('../controllers/file')

/**
 * API
 * @description routes based on sources
 */

module.exports = app => {
	// session
	app.route('/session')
		// get session
		.get(session.get)
		// login
		.post(session.isNull, session.isInfoNotNull, auth.verify, session.post)
		// logout
		.delete(session.isNotNull, session.del)

	// routes for /user
	app.route('/user')
		.get(session.isNotNull, auth.isSelf, user.get)
		// register
		.post(user.isNotNull, user.post)
		// admin manages to delete user
		.delete(session.isNotNull, auth.isAdmin, user.del)
		// admin/user manages to update userinfo
		.put(session.isNotNull, auth.isSelf, user.put)

	// routes for /admin
	app.route('/admin')
		// admin manages to add admin account
		.post(session.isNotNull, auth.isAdmin, user.post)
		.put(session.isNotNull, auth.isAdmin, user.put)

	// routes for /music
	app.route('/music')
		// get music information
		.get(music.get)
		// add music
		.post(session.isNotNull, music.post)
		// delete music
		.delete(session.isNotNull, auth.isAdmin, music.del)

	// routes for /following
	app.route('/following')
		.get(follow.get("following"))
		.post(session.isNotNull, auth.isSelf, follow.post("following"))
		.delete(session.isNotNull, auth.isSelf, follow.del("following"))

	// routes for /followers
	app.route('/followers')
		.get(follow.get("followers"))
		.post(session.isNotNull, follow.hasAuth, follow.post("followers"))
		.delete(session.isNotNull, auth.isSelf, follow.del("followers"))

	// routes for /article
	app.route('/article')
		.get(article.get)
		.post(session.isNotNull, auth.isSelf, article.post)
		.put(session.isNotNull, auth.isSelf, article.put)
		.delete(session.isNotNull, auth.isSelf, article.del)

	// routes for uploader
	app.route('/file')
		.post(file.post)
};
