var createError = require('http-errors');
require('./app_api/models/db');
var express = require('express');
var favicon = require('serve-favicon')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 
var routesApi = require('./app_api/routes/index');
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'images','favicon.ico')))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',routesApi);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
