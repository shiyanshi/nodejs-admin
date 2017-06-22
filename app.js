var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var flash = require('express-flash');
var session = require('express-session');
var sessionstore = require('sessionstore');

var index = require('./routes/index');
var users = require('./routes/users');
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

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "LKSJ&%$#XFE--yhan",
    store: sessionstore.createSessionStore({
        type: 'mongodb',
        host: 'localhost',         // optional
        port: 27017,               // optional
        dbName: 'sessionDb',       // optional
        collectionName: 'sessions',// optional
        timeout: 10000             // optional
        // authSource: 'authedicationDatabase',        // optional
        // username: 'technicalDbUser',                // optional
        // password: 'secret'                          // optional
        // url: 'mongodb://user:pass@host:port/db?opts // optional
    })
}));
app.use(flash());

app.use('/', index);
app.use('/users', users);
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
