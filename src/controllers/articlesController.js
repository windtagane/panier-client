const articlesController = {};
const Article = require('../models/article.js')

articlesController.list = (req, res) => {
    Article.findAll().then(articles => {
        // articles = JSON.stringify(articles, null, 2)
        res.render('articles/_index',{
            articles: articles
        })
        // console.log(articles)
        // console.log(JSON.stringify(articles, null, 2))
    })
}
articlesController.add = (req, res) => {
    res.render('articles/_addForm')
}
articlesController.create = (req, res) => {
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
articlesController.edit = (req, res) => {
    Article.findOne({
        where: {id: req.params.id}

    }).then(article => {
    console.log(article)

        res.render('articles/_editForm',{
            article: article
        })
    })
}
articlesController.update = (req, res) => {
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