const user = require('../controllers/user')
const session = require('../controllers/session')
const auth = require('../controllers/auth')
const music = require('../controllers/music')
const follow = require('../controllers/follow')
const article = require('../controllers/article')
const recommend = require('../controllers/recommend')
const collection = require('../controllers/collection')
const file = require('../controllers/file')

/**
 * @description resource-oriented API
 *  			Router configuration
 * @example		app.route(routePath)
 *			   .method([...middlewares])
 * @param {*} app
 */
module.exports = app => {
	// session
	app.route('/session')
		// get userInfo
		.get(session.get)
		// login
		.post(session.isNull, session.isInfoNotNull, auth.verify, session.post)
		// update userInfo in session
		.put(session.isNotNull, user.putWithSession)
		// logout
		.delete(session.isNotNull, session.del)

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
		// update music
		.put(session.isNotNull, auth.isSelf, )
		// delete music
		.delete(session.isNotNull, auth.isAdmin, music.del)
	
	// get music list
	app.route('/musicList')
		.get(music.getList)

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
	
	// routes for /collection
	app.route('/collection')
		.get(collection.get)
		.post(session.isNotNull, auth.isSelf, collection.post)
		.delete(session.isNotNull, auth.isSelf, collection.del)
	
	// routes for /recommend
	app.route('/recommend')
		.get(recommend.get)

	// routes for /article
	app.route('/article')
		.get(article.get)
		.post(session.isNotNull, auth.isSelf, article.post)
		.put(session.isNotNull, auth.isSelf, article.put)
		.delete(session.isNotNull, auth.isSelf, article.del)

	// get article list
	app.route('/articleList')
		.get(article.getList)

	// routes for uploader
	app.route('/file')
		.post(file.post)
};
