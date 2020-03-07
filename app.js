var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
const fileUpload = require('express-fileupload');
var cookieSession = require('cookie-session')

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

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   secret: "Your secret key",
//   // cookie: { secure: true },
//   resave: false,
//   saveUninitialized: true
// }));

app.use(cookieSession({
  name: 'boutique-panier-client',
  keys: ["Your secret key"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

function checkSignIn(req, res, next){
  if(req.session.user){
     next();     //If session exists, proceed to page
  } else {
     var err = new Error("Not logged in!");
    //  console.log(req.session.user);
    //  next(err);  //Error, trying to access unauthorized page!
    res.redirect('/')
  }
}

/**
 * @MidleWare
 * UTILISATEUR CONNECTÉ
 */
app.get('/*', function(req, res, next) {
  res.locals.user = {}
  if (req.session.user){
    res.locals.user.nom = req.session.user.prenom; // nom de l'utilisateur connecté (dans le menu) accessible pour toutes les vues
    res.locals.user.role = req.session.user.role;
    res.locals.user.id = req.session.user.id;
    res.locals.user.panier = req.session.user.paniers[0]; // le panier en cours, non validé
  }
  next();
});




app.use('/',indexRouter);
app.use('/admin',checkSignIn, adminRouter);
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


//Action upload du fichier image
app.post('/uploads', function (req, res) {
  console.log(req.files.image_article); //requette.files.nom du file 


});
app.use(fileUpload({
  limits: {
    fileSize: 50 * 1024 * 1024
  },
}));



module.exports = app;
