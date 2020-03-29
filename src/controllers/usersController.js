const usersController = {};
const validator = require('validator');

const User = require('../models/user.js');

// GET : /users
usersController.list = (req, res) => {
    User.findAll().then(users => { 
        res.render('users/index', {
            users: users,
            title: "Utilisateurs"
        })
    })
}
// POST : /users/create
usersController.create = (req, res) => { 
    User.create({
        nom: validator.escape(req.body.nom_user),
        prenom: validator.escape(req.body.prenom_user),
        adresse: validator.escape(req.body.adresse_user),
        email: validator.normalizeEmail(req.body.email_user),
        password: req.body.passord_user,
        telephone: req.body.telephone_user
    }).then(res.redirect('/'))
}
// GET : /users/edit/:id
usersController.edit = (req, res) => { 
    User.findOne({
        where: {id: req.params.id}

    }).then(user => {
    // console.log(user)
        res.render('users/_editForm',{
            user: user,
            title: 'Modifier un utilisateur'
        })
    })
}
// POST : users/update/:id
usersController.update = (req, res) => { 
    console.log(req.body)
    User.findOne({
        where: {id: req.params.id}
    }).then(user => {
        
        User.update({
            nom: validator.escape(req.body.nom_user),
            prenom: validator.escape(req.body.prenom_user),
            adresse: validator.escape(req.body.adresse_user),
            email: validator.normalizeEmail(req.body.email_user),
            password: req.body.passord_user,
            telephone: req.body.telephone_user,
            role: req.body.role_user
        }, {
            where:{
                id:req.params.id
            }
        })
        .then(res.json({"success": true}))
            .catch((err) => {
                res.json({
                    "success": false,
                    "error": err
                })
            })
        //.then(res.redirect('/admin?tab=users'))
    })
}

// GET : users/delete/:id
usersController.delete = (req, res) => { 
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

// GET : users/jsonList
usersController.jsonList = (req, res) => { 
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

/**
 * @method GET
 * @url /users/view/:id/json
 */
usersController.jsonView = (req, res) => {
    // console.log(req.params.id)
    User.findOne({
        where: {id: req.params.id}
    }).then(user => {
        // console.log(categorie)
        res.json({
            "success": true,
            "data": user
        });
    })
    .catch((err) => {
        res.json({
            "success": false,
            "error": err
        })
    })
}

usersController.jsonDelete = (req, res) => { 
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
        res.json({
            "success": true,
        });
    })
    .catch((err) => {
        res.json({
            "success": false,
            "error": err
        })
    })
}


module.exports = usersController;