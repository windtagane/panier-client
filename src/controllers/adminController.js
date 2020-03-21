const adminController = {};
const Article = require('../models/article.js');
const User = require('../models/user.js');
const Panier = require('../models/panier.js');


adminController.index = (req, res) => { // GET /admin
    if (!req.session.user || req.session.user.role !== 1) {
        error = {status: '404',message: 'Ressource non trouvée'}
        return res.status(404).render('errors/index', {
            title:'Ressource non trouvée'
        });
    }
    res.render('admin/index', {
        title: "Administation"
    })
}

adminController.stats = async(req, res) => {
    if (!req.session.user || req.session.user.role !== 1) {
        error = {status: '404',message: 'Ressource non trouvée'}
        return res.status(404).render('errors/index', {
            title:'Ressource non trouvée'
        });

    }
    stats = {}
    stats.nbArticles = await Article.count();
    stats.nbUsers = await User.count();
    stats.nbCommandes = await Panier.count();
    stats.sumAllCommandes = await Panier.sum('prixTotal');

    res.json(stats);






    console.log(stats)

    res.render('admin/index', {
        title: "Administation"
    })

}

module.exports = adminController;