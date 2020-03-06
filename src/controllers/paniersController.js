const paniersControlleur = {};

const Panier = require('../models/panier.js');
const LignePanier = require('../models/articles_has_paniers.js');
const Article = require('../models/article.js');

Panier.belongsToMany(Article,{foreignKey: 'paniers_id', through: 'articles_has_paniers' }); // le panier appartien à un utilisateur.
Article.belongsToMany(Panier,{foreignKey: 'articles_id', through: 'articles_has_paniers' }); // le panier appartien à un utilisateur.


paniersControlleur.list = (req, res) => { // GET : /paniers
    Panier.findAll({ include: [ { model: Article, require: true } ]}).then(paniers => { // inclus les articles d'un panier
        // console.log(paniers)
        res.render('paniers/index', {
            paniers: paniers,
            title: "Paniers"
        })
    })
}
paniersControlleur.create = (req, res) => { // POST : /paniers/create
    Panier.create({
        prixTotal: 0,
        utilisateur_id: req.body.user_id
    }).then(res.redirect('/'))
}
paniersControlleur.edit = (req, res) => { // GET : /paniers/edit/:id
    Panier.findOne({
        where: {id: req.params.id}

    }).then(panier => {
        // console.log(user)
            res.render('panier/_editForm',{
                panier: panier
            })
        })
}
paniersControlleur.update = (req, res) => { // POST : /paniers/update/:id
    Panier.findOne({
        where: {id: req.params.id}
    }).then(panier => {
        Panier.update({
            prixTotal: req.body.prix_total,
        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/'))
    })
}
paniersControlleur.delete = (req, res) => { // GET : /paniers/delete:id
    Panier.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/')
    })
}
paniersControlleur.addToPanier = (req, res) => { // POST : /paniers/:id/addToPanier/:idArticle
    LignePanier.create({
        articles_id: req.body.article_id,
        paniers_id: req.body.panier_id,
        quantite: req.body.quantite
    }).then(res.redirect('/'))
}

module.exports = paniersControlleur;