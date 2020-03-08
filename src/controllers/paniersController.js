const paniersControlleur = {};

const Panier = require('../models/panier.js');
const LignePanier = require('../models/articles_has_paniers.js');
const Article = require('../models/article.js');
const User = require('../models/user.js');


Panier.belongsToMany(Article,{foreignKey: 'paniers_id', through: 'articles_has_paniers' }); // le panier appartien à un utilisateur.
Article.belongsToMany(Panier,{foreignKey: 'articles_id', through: 'articles_has_paniers' }); // le panier appartien à un utilisateur.
User.hasMany(Panier,{foreignKey: 'utilisateurs_id'}) // Un utilisateur peut faire plusieurs panier
Panier.belongsTo(User,{foreignKey: 'utilisateurs_id'}) // Un panier appartien à un seul utilisateur
Panier.hasMany(LignePanier,{foreignKey:'paniers_id'}); // un panier peut avoir plusieur articles
Article.hasMany(LignePanier, {foreignKey: 'articles_id'}); // un article peut etre dans plusieur ligne ligne d'un panier
LignePanier.belongsTo(Article,{foreignKey: 'articles_id'}); // une ligne d'un panier concerne un seul article
LignePanier.belongsTo(Panier,{foreignKey:'paniers_id'}); // une ligne d'un panier concerne seulement un panier

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
        where: {id: req.params.id,utilisateurs_id: req.session.user.id},
        include:[{
            model: LignePanier,
            include:[{
                model:Article
            }]
        }]
    })
    // console.log(panier)

    res.render('paniers/index',{
        panier: panier,
        title: "Mon panier"
    })
}

paniersControlleur.create = async (req, res) => { // POST : /paniers/create
    if (Number(req.body.quantite) < 1) return res.json({res:'KO',message:'Quantité invalide'});
    if (Number(req.body.user_id) !== req.session.user.id) return res.json({res:'KO',message:'Une erreur est survenue'});
    
    let article = await Article.findOne({
        where: {id:req.body.article_id}
    })
    if (article === null) return res.json({res:'KO',message:'Article invalide'});
    let panier = await Panier.findOne({
        where: {utilisateurs_id: req.session.user.id, valide: 0}
    })
    if (panier === null) {
        panier = await Panier.create({
            prixTotal: 0, 
            utilisateurs_id: req.session.user.id,
            valide:0});
    }
    const newTotal = Number(panier.prixTotal) + Number(article.prix) * Number(req.body.quantite);
    console.log(newTotal)
    await Panier.update({ prixTotal: newTotal }, {
        where: {
          id: panier.id
        }
    });

    const lignePanier = await LignePanier.create({
        articles_id: req.body.article_id,
        paniers_id: await panier.id,
        quantite: req.body.quantite});
    
    
    res.status("200");
    req.session.user.paniers[0] = panier;
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

paniersControlleur.removeToPanier = async(req, res) => { // POST : /paniers/:id/addToPanier/:idArticle
    if (!req.params.id || !req.params.idArticle || !req.body.user_id) return res.json({res: "KO", message:"Donées manquantes"})
    if (Number(req.body.user_id) !== req.session.user.id) return res.json({res:"KO",message:"Une erreur est survenue"});
    
    article = await LignePanier.findOne({
        where: {paniers_id: req.params.id,id: req.params.idArticle},
        include:[{model:Panier},{model:Article}],
    })
    if (article === null) return res.json({res:"KO",message:"Une erreur est survenue"});
    if (article.panier.utilisateurs_id !== req.session.user.id) return res.json({res:"KO",message:"Une erreur est survenue"});

    const panier = await Panier.findOne({
        where: {id:article.panier.id}
    })

    const newTotal = Number(panier.prixTotal) - Number(article.article.prix) * Number(article.quantite);
    await Panier.update({ prixTotal: newTotal }, {
        where: {
          id: panier.id
        }
    });

    await LignePanier.destroy({
        where: {id: article.id}
    });


    res.json({res:"OK",message:"Votre article a été enlevé du panier",newTotal})
}

paniersControlleur.editArticleQuantity = async(req,res) => {// POST : /paniers/:id/quantite/:idArticle
    
    if (!req.params.id || !req.params.idArticle || !req.body.user_id) return res.json({res: "KO", message:"Donées manquantes"})
    if (Number(req.body.user_id) !== req.session.user.id) return res.json({res:"KO",message:"Une erreur est survenue"});

    if (Number(req.body.quantite) < 1) return res.json({res:"KO",message:"Quantité invalide"});

    const lignePanier = await LignePanier.findOne({
        where: {id: req.params.idArticle}, include:[{model:Panier},{model:Article}]
    })
    if (lignePanier === null) return res.json({res:"KO",message:"Une erreur est survenue"});
    if (lignePanier.panier.utilisateurs_id !== req.session.user.id) return res.json({res:"KO",message:"Une erreur est survenue"});

    let newTotal = Number(lignePanier.panier.prixTotal) - Number(lignePanier.article.prix) * Number(lignePanier.quantite);

    
    await LignePanier.update({ quantite: req.body.quantite }, {
        where: {
          id: req.params.idArticle
        }
    });

    newTotal += Number(lignePanier.article.prix) * Number(req.body.quantite);

    await Panier.update({ prixTotal: newTotal }, {
        where: {
          id: lignePanier.panier.id
        }
    });



    res.json({res:"OK",message:"La quantité à été mise a jour",newTotal})
}

module.exports = paniersControlleur;