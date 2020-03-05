const usersController = {};

const User = require('../models/user.js');

usersController.list = (req, res) => {
    User.findAll().then(users => {
        res.render('users/index', {
            users: users,
            title: "Utilisateurs"
        })
    })
}
usersController.create = (req, res) => {
    User.create({
        nom: req.body.nom_user,
        prenom: req.body.prenom_user,
        adresse: req.body.adresse_user,
        email: req.body.email_user,
        password: req.body.passord_user,
        telephone: req.body.telephone_user
    }).then(res.redirect('/'))
}
usersController.edit = (req, res) => {
    User.findOne({
        where: {id: req.params.id}

    }).then(user => {
    // console.log(user)
        res.render('user/_editForm',{
            user: user
        })
    })
}
usersController.update = (req, res) => {
    User.findOne({
        where: {id: req.params.id}
    }).then(article => {
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
usersController.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/')
    })
}

module.exports = usersController;