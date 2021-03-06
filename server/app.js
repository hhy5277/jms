var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeDataRouter = require('./routes/homeData');
var usersRouter = require('./routes/users');
var cityRouter = require('./routes/city');
var sendRouter = require('./routes/send');
var comRouter = require('./routes/communi');
var picRouter = require('./routes/pic_data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('cors')());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/homeData', homeDataRouter);
app.use('/users', usersRouter);
app.use('/city', cityRouter);
app.use('/send', sendRouter);
app.use('/com', comRouter);
app.use('/pic', picRouter);

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
