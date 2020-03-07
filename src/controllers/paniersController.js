const paniersControlleur = {};

const Panier = require('../models/panier.js');
const LignePanier = require('../models/articles_has_paniers.js');
const Article = require('../models/article.js');
const User = require('../models/user.js');


Panier.belongsToMany(Article,{foreignKey: 'paniers_id', through: 'articles_has_paniers' }); // le panier appartien à un utilisateur.
Article.belongsToMany(Panier,{foreignKey: 'articles_id', through: 'articles_has_paniers' }); // le panier appartien à un utilisateur.
User.hasMany(Panier,{foreignKey: 'utilisateurs_id'}) // Un utilisateur peut faire plusieurs panier
Panier.belongsTo(User,{foreignKey: 'utilisateurs_id'}) // Un panier appartien à un seul utilisateur

paniersControlleur.list = (req, res) => { // GET : /paniers
   // Panier.findAll({ include: [ { model: Article, require: true } ]}).then(paniers => { // inclus les articles d'un panier
        // console.log(paniers)
        res.render('paniers/index', {
     //       paniers: paniers,
            title: "Paniers"
        })
  //  })
}

paniersControlleur.show = async(req, res) => { // GET /paniers/:id
    if (!req.session.user.id || !req.params.id) return res.redirect('/');
    
    panier = await Panier.findOne({
        where: {id: req.params.id,utilisateurs_id: req.session.user.id}
    })
    console.log(panier)

    res.render('paniers/index',{
        panier: panier,
        title: "Mon panier"
    })
}

paniersControlleur.create = async (req, res) => { // POST : /paniers/create
    if (req.body.quantite == 0) return res.json({res:'KO',message:'Quantité invalide'})
    if (Number(req.body.user_id) !== req.session.user.id) return res.json({res:'KO',message:'Une erreur est survenue'});
    
    let panier = await Panier.findOne({
        where: {utilisateurs_id: req.session.user.id, valide: 0}
    })
    if (panier === null) {
        panier = await Panier.create({
            prixTotal: 0, 
            utilisateurs_id: req.session.user.id,
            valide:0});
    }

    const lignePanier = await LignePanier.create({
        articles_id: req.body.article_id,
        paniers_id: await panier.id,
        quantite: req.body.quantite});
    
    
    res.status("200");
    res.json({res:'OK',panier_id:panier.id});

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