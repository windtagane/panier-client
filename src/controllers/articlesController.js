const articlesController = {};
const Article = require('../models/article.js')

articlesController.list = (req, res) => { // GET : /articles
    Article.findAll().then(articles => {
        res.render('articles/index',{
            articles: articles,
            title: "Articles"
        })
    })
}

articlesController.jsonList = (req, res) => { // GET : /articles/jsonList
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
articlesController.add = (req, res) => { // GET : /articles/add
    res.render('articles/_addForm')
}
articlesController.create = (req, res) => { // POST : /articles/create
    // console.log(req.body)

    Article.create({
        nom: req.body.nom_article,
        detail: req.body.detail_article,
        prix: req.body.prix_article,
        image: req.body.image_article,
        categories_id: Number(req.body.categorie_article)
    }).then(res.redirect('/articles'))
    // console.log(req.body)
}
articlesController.edit = (req, res) => { // GET : /articles/edit/:id
    Article.findOne({
        where: {id: req.params.id}

    }).then(article => {
    // console.log(article)

        res.render('articles/_editForm',{
            article: article
        })
    })
}
articlesController.update = (req, res) => { // POST : /articles/update/:id
    // console.log(req.body)
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
articlesController.delete = (req, res) => {// GET : /articles/delete/:id
    Article.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/articles')
    })
}

module.exports = articlesController;