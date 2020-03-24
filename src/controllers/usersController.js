const usersController = {};

const User = require('../models/user.js');

usersController.list = (req, res) => {
    User.findAll().then(users => { // GET : /users
        res.render('users/index', {
            users: users,
            title: "Utilisateurs"
        })
    })
}
usersController.create = (req, res) => { // POST : /users/create
    User.create({
        nom: req.body.nom_user,
        prenom: req.body.prenom_user,
        adresse: req.body.adresse_user,
        email: req.body.email_user,
        password: req.body.passord_user,
        telephone: req.body.telephone_user
    }).then(res.redirect('/'))
}
usersController.edit = (req, res) => { // GET : /users/edit/:id
    User.findOne({
        where: {id: req.params.id}

    }).then(user => {
    // console.log(user)
        res.render('users/_editForm',{
            user: user
        })
    })
}
usersController.update = (req, res) => { // POST : users/update/:id
    User.findOne({
        where: {id: req.params.id}
    }).then(user => {
        User.update({
            nom: req.body.nom_user,
            prenom: req.body.prenom_user,
            adresse: req.body.adresse_user,
            email: req.body.email_user,
            password: req.body.passord_user,
            telephone: req.body.telephone_user
        }, {
            where:{
                id:req.params.id
            }
        }).then(res.redirect('/'))
    })
}
usersController.delete = (req, res) => { // GET : users/delete/:id
    if (!req.session.user || req.session.user.role !== 1) {
        error = {status: '403',message: 'Permission non accordée'}
        return res.status(403).render('errors/index', {
            title:'Permission non accordée'
        });
    }

    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin?tab=users')
    })
}

usersController.jsonList = (req, res) => { // GET : users/jsonList
    User.findAll()
        .then(users => { 
            try {
                res.json({
                    statut: "OK",
                    data: users,
                    message: ""
                })
            } catch (error) {
                res.json({
                    statut: "KO",
                    message: error
                })
            }
        })
}

module.exports = usersController;