const indexController = {};

indexController.index = (req, res) => {
    res.render('acceuil/index', {
        title: "Panier-client"
    });
}

module.exports = indexController;