const adminController = {};

adminController.index = (req, res) => { // GET /admin
    res.render('admin/index', {
        title: "Administation"
    })
}

module.exports = adminController;