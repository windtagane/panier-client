const adminController = {};

adminController.index = (req, res) => {
    res.render('admin/index', {
        title: "Administation"
    })
}

module.exports = adminController;