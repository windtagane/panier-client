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
commentsController.create = (req, res) => {}
commentsController.edit = (req, res) => {}
commentsController.update = (req, res) => {}
commentsController.delete = (req, res) => {}

module.exports = commentsController;