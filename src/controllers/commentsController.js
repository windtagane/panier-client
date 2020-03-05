const commentsController = {};
const Comment = require('../models/comment.js');
const Article = require('../models/article.js');


commentsController.list = (req, res) => {
    Article.findOne({
        where: {id: req.params.id}, include:[{model:Comment}] // Inclut les articles d'une categorie
    }).then(article => {
        // console.log(article.commentaires)
        res.render('comments/_index',{
            commentaires: article.commentaires
        });
    });
}
commentsController.create = (req, res) => {
    Comment.create({
        description: req.body.description_comment,
        utilisateur_id: req.body.user_comment,
        article_id: req.body.article_comment
    }).then(res.redirect('/'))
}
commentsController.edit = (req, res) => {
    Comment.findOne({
        where: {id: req.params.id}

    }).then(comment => {
        // console.log(user)
            res.render('user/_editForm',{
                comment: comment
            })
        })
}
commentsController.update = (req, res) => {}
commentsController.delete = (req, res) => {}

module.exports = commentsController;