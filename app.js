/*
 * Main Application
 */

const createError = require('http-errors');
const express = require('express');
const compression = require('compression')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { cors } = require('./middlewares/cors')
const { timeout, timeoutHalter } = require('./middlewares/timeout')
const session = require('./middlewares/session')

// initialize mongodb and redis
require('./lib/redis');
require('./lib/mongodb');

const app = express();

// request timeout
app.use(timeout(60 * 1000));
app.use(timeoutHalter)

// gzip
app.use(compression())

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('musicine_server_cookie'));
// session redis storage
app.use(session());

app.use((req, res, next) => {
	// allow request with cookie
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-type, X-Requested-With');
	next();
});

app.use(cors())

// router
require('./routes/')(app);

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
