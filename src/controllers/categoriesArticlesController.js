const categoriesArticlesController = {};
const Categorie = require('../models/categorie.js');
const Article = require('../models/article.js');

categoriesArticlesController.list = (req, res) => { 
    Categorie.findAll().then(categories => {
        res.render('acceuil/index',{ // categories/_index
            categories: categories,
            title: "Panier-client"
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
    res.render('categories/_addForm', {
        title: "Ajouter une catégorie"
    });
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
                title: "Modifier une catégorie",
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

categoriesArticlesController.jsonList = (req, res) => {
    Categorie.findAll().then(categories => {
        try {
            res.json({
                statut: "OK",
                data: categories,
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

module.exports = categoriesArticlesController;