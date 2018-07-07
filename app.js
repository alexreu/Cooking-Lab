var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var urlDatabase = process.env.MONGO_URI;

//connexion à la base de donnée
mongoose.connect(urlDatabase)
    .then(() => console.log('Connexion à la BDD OK'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//utilisation des sessions
app.use(session({
    secret: 'Work Hard',
    resave: true,
    saveUninitialized: false
}));

var test = require('./routes/routeTest');
app.use('/test', test);

// route qui mène à l'index
var index = require('./routes/index');
app.use('/', index);

// route qui affiche les  ateliers et les differentes actions possibles
var ateliers = require('./routes/ateliersRoute');
app.use('/ateliersRoute', ateliers);

//route pour les différentes actions possibles pour un utilisateur
var utilisateurs = require('./routes/utilisateurs');
app.use('/utilisateurs',utilisateurs);

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
