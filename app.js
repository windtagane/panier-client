var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./src/routes/indexRoute');
var adminRouter = require('./src/routes/adminRoute');
var usersRouter = require('./src/routes/usersRoute');
var articlesRouter = require('./src/routes/articlesRoute');
var commentsRouter = require('./src/routes/commentsRoute');
var paniersRouter = require('./src/routes/paniersRoute');
var categoriesArticles = require('./src/routes/categoriesArticlesRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({secret: "Your secret key"}));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/paniers', paniersRouter);
app.use('/comments', commentsRouter);
app.use('/categories', categoriesArticles);

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
