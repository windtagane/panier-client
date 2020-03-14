const articlesController = {};
const paginate = require('express-paginate');
const Article = require('../models/article.js')

/**
 * @method GET
 * @url /articles
 */
articlesController.list = async (req, res,next) => {

    Article.findAndCountAll({limit: req.query.limit, offset: req.skip})
    .then(results => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('articles/index', {
          articles: results.rows,
          pageCount,
          itemCount,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
          title: "Articles"
        });
    }).catch(err => next(err))





    // Article.findAll().then(articles => {
    //     res.render('articles/index',{
    //         articles: articles,
    //         title: "Articles"
    //     })
    // })
}

/**
 * @method GET
 * @url /articles/jsonList
 */
articlesController.jsonList = (req, res) => {
    Article.findAll().then(articles => {
        try {
            res.json({
                statut: "OK",
                data: articles,
                message: ""
            })
        } catch (error) {
            res.json({
                statut: "KO",
                message: error
            })
        }
    })
}
articlesController.add = (req, res) => {
    res.render('articles/_addForm', {
        title: "Ajouter un article"
    })
}
articlesController.create = async(req, res) => {
    console.log(req.body);
    console.log(req.files);

    Article.create({
        nom: req.body.nom_article,
        detail: req.body.detail_article,
        prix: req.body.prix_article,
        //image: req.body.image_article,
        categories_id: Number(req.body.categorie_article),
        image : req.files.image_article.name,

        
    });
    let sampleFile = req.files.image_article; // nom du champ image

    // il faut que le dossier upload existe... ;)
    const file = await sampleFile.mv(mainDir+'/public/uploads/'+sampleFile.name, function(err) { 
      if (err) return res.status(500).send(err);
    })
    res.redirect('/articles') 
}

/**
 * @method GET
 * @url /articles/edit/:id
 */
articlesController.edit = (req, res) => {
    Article.findOne({
        where: {id: req.params.id}

    }).then(article => {
        res.render('articles/_editForm',{
            title: "Modifier un article",
            article: article
        })
    })
}

/**
 * @method POST
 * @url /articles/update/:id
 */
articlesController.update = (req, res) => {
    Article.findOne({
        where: {id: req.params.id}
    }).then(article => {
        Article.update({
            nom: req.body.nom_article,
            detail: req.body.detail_article,
            prix: req.body.prix_article,
            image: req.body.image_article,
            categories_id: req.body.categorie_article
        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/articles'))
    })
}

/**
 * @method GET
 * @url /articles/delete/:id
 */
articlesController.delete = (req, res) => {
    Article.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/articles')
    })
}

module.exports = articlesController;