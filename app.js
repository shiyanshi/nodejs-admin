var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var flash = require('express-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var sessionstore = require('sessionstore');
var passport = require('passport');

// get the keys
var secret = require('./config/secret');

var index = require('./routes/index');
var user = require('./routes/user');
var patients = require('./routes/patients');
var patient = require('./routes/patient');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore({url: secret.database, autoReconnect: true})
}));
app.use(flash());

// make use of our passport module
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    // assign each route the user object
    res.locals.user = req.user;
    next();
});

app.use('/', index);
app.use(user);
app.use('/patients', patients);
app.use('/patient', patient);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
