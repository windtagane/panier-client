const articlesController = {};

articlesController.list = (req, res) => {
    res.render("articles/index", {
        title: "Articles"
    })
}
articlesController.create = (req, res) => {}
articlesController.edit = (req, res) => {}
articlesController.update = (req, res) => {}
articlesController.delete = (req, res) => {}
articlesController.addToPanier = (req, res) => {}

module.exports = articlesController;