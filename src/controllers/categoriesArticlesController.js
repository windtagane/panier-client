const categoriesArticlesController = {};
const Categorie = require('../models/categorie.js');
const Article = require('../models/article.js');

categoriesArticlesController.list = (req, res) => { 
    Categorie.findAll().then(categories => {
        res.render('categories/_index',{
            categories: categories
        });
    });
};
categoriesArticlesController.view = (req, res) => {
    // console.log(req.params.id)
    Categorie.findOne({
        where: {id: req.params.id}, include:[{model:Article}] // Inclut les articles d'une categorie

    }).then(categorie => {
        // console.log(categorie)
        res.render('categories/_view',{
            categorie: categorie
        });
    });
}

categoriesArticlesController.add = (req, res) => {
    res.render('categories/_addForm');
}
categoriesArticlesController.create = (req, res) => {
    // console.log(req.body)
    Categorie.create({
        nom: req.body.nom_categorie,
        active: req.body.active_categorie,
    }).then(res.redirect('/categories'))
}
categoriesArticlesController.edit = (req, res) => {
    Categorie.findOne({
        where: {id: req.params.id}
    }).then(categorie => {
        // console.log(categorie)
            res.render('categories/_editForm',{
                categorie: categorie
            })
        })
}
categoriesArticlesController.update = (req, res) => {
    // console.log(req.body)
    Categorie.findOne({
        where: {id: req.params.id}
        }).then(categorie => {
            Categorie.update({
                nom: req.body.nom_categorie,
                active: req.body.active_categorie
            }, {
                where:{
                    id:req.params.id
                }
            }).then(res.redirect('/categories'))
        })

}
categoriesArticlesController.delete = (req, res) => {
    Categorie.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/categories')
    })
}

module.exports = categoriesArticlesController;