const commentsController = {};
const Comment = require('../models/comment.js');
const Article = require('../models/article.js');


commentsController.list = (req, res) => { // GET : /comments/article/:id
    Article.findOne({
        where: {id: req.params.id}, include:[{model:Comment}] // Inclut les commentaire d'un article
    }).then(article => {
        // console.log(article.commentaires)
        res.render('comments/_index',{
            commentaires: article.commentaires
        });
        
    });
}
commentsController.create = (req, res) => { // POST : /comments/article/:id/create
    Comment.create({
        description: req.body.description_comment,
        utilisateur_id: req.body.user_comment,
        article_id: req.body.article_comment
    }).then(res.redirect('/'))
}
commentsController.edit = (req, res) => { // GET : /comments/edit/:id
    Comment.findOne({
        where: {id: req.params.id}

    }).then(comment => {
        // console.log(user)
            res.render('user/_editForm',{
                comment: comment
            })
        })
}
commentsController.update = (req, res) => { // POST : /comments/update/:id
    Comment.findOne({
        where: {id: req.params.id}
    }).then(comment => {
        Comment.update({
            description: req.body.description_comment,
            utilisateur_id: req.body.user_comment,
            articleComment_id: req.body.article_comment
        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/'))
    })
}
commentsController.delete = (req, res) => { // GET : /comments/delete/:id
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/')
    })
}

module.exports = commentsController;