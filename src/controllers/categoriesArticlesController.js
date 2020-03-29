const categoriesArticlesController = {};
const validator = require('validator');

const Categorie = require('../models/categorie.js');
const Article = require('../models/article.js');

/**
 * @method GET
 * @url /categories
 */

categoriesArticlesController.list = (req, res) => {
    Categorie.findAll().then(categories => {
        res.render('acceuil/index',{ // categories/_index
            categories: categories,
            title: "Panier-client"
        });
    });
};

/**
 * @method GET
 * @url /categories/view/:id
 */
categoriesArticlesController.view = (req, res) => {
    // console.log(req.params.id)
    Categorie.findOne({
        where: {id: req.params.id}, include:[{model:Article}] // Inclut les articles d'une categorie
    }).then(categorie => {
        // console.log(categorie)
        res.render('categories/show',{
            categorie: categorie,
            title: categorie.nom
        });
    });
}

/**
 * @method GET
 * @url /categories/add
 */

categoriesArticlesController.add = (req, res) => {
    res.render('categories/_addForm', {
        title: "Ajouter une catégorie"
    });
}

/**
 * @method POST
 * @url /categories/create
 */
categoriesArticlesController.create = (req, res) => {
    // console.log(req.body)
    Categorie.create({
        nom: validator.escape(req.body.nom_categorie),
        active: req.body.active_categorie,
    }).then(res.json({"success": true}))
    .catch((err) => {
        res.json({
            "success": false,
            "message": err
        })
    })
}

/**
 * @method GET
 * @url /categories/edit/:id
 */
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

/**
 * @method POST
 * @url /categories/update/:id
 */
categoriesArticlesController.update = (req, res) => {
    Categorie.findOne({
        where: {id: req.params.id}
        }).then(categorie => {
            Categorie.update({
                nom: validator.escape(req.body.nom_categorie),
                active: req.body.active_categorie
            }, {
                where:{
                    id:req.params.id
                }
            }).then(res.json({"success": true}))
            .catch((err) => {
                res.json({
                    "success": false,
                    "error": err
                })
            })
        })  

}

/**
 * @method POST
 * @url /categories/delete/:id
 */
categoriesArticlesController.delete = (req, res) => {
    if (!req.session.user || req.session.user.role !== 1) {
        error = {status: '403',message: 'Permission non accordée'}
        return res.status(403).render('errors/index', {
            title:'Permission non accordée'
        });
    }
    
    Categorie.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin?tab=categories')
    })
}

/**
 * @method GET
 * @url /categories/jsonList
 */
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

/**
 * @method GET
 * @url /categories/view/:id/json
 */
categoriesArticlesController.jsonView = (req, res) => {
    // console.log(req.params.id)
    Categorie.findOne({
        where: {id: req.params.id}, include:[{model:Article}] // Inclut les articles d'une categorie
    }).then(categorie => {
        // console.log(categorie)
        res.json({
            "success": true,
            "data": categorie
        });
    })
    .catch((err) => {
        res.json({
            "success": false,
            "error": err
        })
    })
}

/**
 * @method POST
 * @url /categories/delete/:id/json
 */
categoriesArticlesController.jsonDelete = (req, res) => {
    if (!req.session.user || req.session.user.role !== 1) {
        error = {status: '403',message: 'Permission non accordée'}
        return res.status(403).render('errors/index', {
            title:'Permission non accordée'
        });
    }
    
    Categorie.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.json({
            "success": true,
        });
    })
    .catch((err) => {
        res.json({
            "success": false,
            "error": err
        })
    })
}

module.exports = categoriesArticlesController;