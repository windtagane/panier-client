const paniersControlleur = {};

const Panier = require('../models/panier.js');
const LignePanier = require('../models/articles_has_paniers.js');
const Article = require('../models/article.js');

Panier.belongsToMany(Article,{foreignKey: 'paniers_id', through: 'articles_has_paniers' }); // le panier appartien à un utilisateur.
Article.belongsToMany(Panier,{foreignKey: 'articles_id', through: 'articles_has_paniers' }); // le panier appartien à un utilisateur.


paniersControlleur.list = (req, res) => {
    Panier.findAll({ include: [ { model: Article, require: true } ]}).then(paniers => {
        // console.log(paniers)
        res.render('paniers/index', {
            paniers: paniers,
            title: "Paniers"
        })
    })
}
paniersControlleur.create = (req, res) => {
    Panier.create({
        prixTotal: 0,
        utilisateur_id: req.body.user_id
    }).then(res.redirect('/'))
}
paniersControlleur.edit = (req, res) => {
    Panier.findOne({
        where: {id: req.params.id}

    }).then(panier => {
        // console.log(user)
            res.render('panier/_editForm',{
                panier: panier
            })
        })
}
paniersControlleur.update = (req, res) => {
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
paniersControlleur.delete = (req, res) => {
    Panier.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/')
    })
}
paniersControlleur.addToPanier = (req, res) => {
    LignePanier.create({
        articles_id: req.body.article_id,
        paniers_id: req.body.panier_id,
        quantite: req.body.quantite
    }).then(res.redirect('/'))
}

module.exports = paniersControlleur;