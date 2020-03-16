var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cookieSession = require('cookie-session')

require("dotenv").config();

var indexRouter = require('./src/routes/indexRoute');
var adminRouter = require('./src/routes/adminRoute');
var usersRouter = require('./src/routes/usersRoute');
var articlesRouter = require('./src/routes/articlesRoute');
var commentsRouter = require('./src/routes/commentsRoute');
var paniersRouter = require('./src/routes/paniersRoute');
var categoriesArticles = require('./src/routes/categoriesArticlesRoute');
const paginate = require('express-paginate');

var app = express();

mainDir = __dirname;

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
app.use(paginate.middleware(6, 50));
app.use(function(req, res, next) {
    res.locals.query = req.query;
    res.locals.page   = req.originalUrl.split('page=')[1];
    next();
 });


app.use(cookieSession({
  name: 'boutique-panier-client',
  keys: ["Your secret key"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


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
  }
  next();
});

/**
 * @MidleWare
 * CATEGORIES
 */
app.get('/*', async function(req, res, next) {
  const Categorie = require('./src/models/categorie.js');
  const categories = await Categorie.findAll({attributes:['id','nom','active'],raw:true});
  res.locals.categories = categories;
  next();
});




app.use('/',indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/paniers', paniersRouter);
app.use('/comments', commentsRouter);
app.use('/categories', categoriesArticles);

app.get('*', function(req, res) {
  error = {status: '404',message: 'Ressource non trouvée'}
  res.status(404).render('errors/index', {
    title:'Ressource non trouvée',
    error
  });
});
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

//Route pour uploads image
app.post('/uploads', function (req, res) {
  console.log(req.files.image_article.name); //requette.files.nom du file 


});
// app.use(fileUpload({
//   limits: {
//     fileSize: 50 * 1024 * 1024
//   },
// }));



module.exports = app;
