var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require("express-session");
const flash = require("connect-flash");



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(flash());
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "NamanHello"
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());//this function is used to determine what data of the user should be stored in the database server
//it is basically responsible for the data that has to be stored in the session as passport store some data od the user while authentication

passport.deserializeUser(usersRouter.deserializeUser());//this is reposible for fetching the user data from the database 
//this works like it uses the data store in the session and then by using that data it fetch the whole object from the server related to the user


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
