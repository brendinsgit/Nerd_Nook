var createError = require('http-errors');
var express = require('express');
var methodOverride = require('method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var ordersRouter = require('./routes/orders');
var gamesRouter = require('./routes/games');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


//this sets up our session so passport can use it
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

// Here we'll register passport, so that we can use 
// the session, and before our routes so that our routes can have access to req.user
app.use(passport.initialize())
app.use(passport.session())

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/orders', ordersRouter);


app.use('/games', gamesRouter);

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
