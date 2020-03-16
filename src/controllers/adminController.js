const adminController = {};

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

module.exports = adminController;