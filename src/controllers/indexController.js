const indexController = {};

indexController.index = (req, res) => {
    res.render('index', {
        title: "Panier-client"
    });
}

module.exports = indexController;