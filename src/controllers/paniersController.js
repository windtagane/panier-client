const paniersControlleur = {};

const Panier = require('../models/panier.js');
const LignePanier = require('../models/articles_has_paniers.js');



paniersControlleur.list = (req, res) => {
    Panier.findAll().then(paniers => {
        res.render('users/index', {
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
paniersControlleur.addToPanier = (req, res) => {}

module.exports = paniersControlleur;