var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var urlDatabase = process.env.MONGO_URI;

//connexion à la base de donnée
mongoose.connect(urlDatabase, {useNewUrlParser: true});

var db = mongoose.connection;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//utilisation des sessions
app.use(session({
    // personnalisation du secret
    secret: 'My secret bomboklat wonbo combo',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));


// route qui mène à l'index
var index = require('./routes/index');
app.use('/', index);

// route qui affiche les ateliers disponibles à l'inscription
var ateliersPublics = require ('./routes/index/ateliersPublicsRoute')
app.use('/ateliersPublicsRoute', ateliersPublics);

//route qui permet l'inscription à un atelier
var reservations = require ('./routes/reservations/reservationsRoute')
app.use('/reservationsRoute', reservations);

// route qui affiche les  ateliers et les differentes actions possibles pour le cuisinier
var ateliers = require('./routes/ateliers/ateliersRoute');
app.use('/ateliersRoute', ateliers);

//route pour les différentes actions possibles pour un utilisateur
var utilisateurs = require('./routes/utilisateurs/utilisateurs');
app.use('/utilisateurs',utilisateurs);

var admin = require('./routes/admin/admin');
app.use('/admin', admin);

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
