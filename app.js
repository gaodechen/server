/*
 * Main Application
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const config = require('./config/config')

// initialize mongodb and redis
require('./lib/redis');
require('./lib/mongodb');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('musicine_server_cookie'));
app.use(
	session({
		secret: 'musicine_server_cookie',
		// cookie key in browser
		name: 'session_id',
		resave: true,
		saveUninitialized: true,
		// cookit time limit
		cookie: { maxAge: 60 * 1000 * 30, httpOnly: true },
	}),
);

app.use((req, res, next) => {
	// allowed origin address & port
	res.setHeader('Access-Control-Allow-Origin', config.FRONT_SERVER);
	// allow request with cookie
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-type, X-Requested-With');
	next();
});

// router
require('./routes/') (app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
