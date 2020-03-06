const indexController = {};
const User = require('../models/user.js');

indexController.index = (req, res) => { // GET : /
    // res.render('acceuil/index', {
    //     title: "Panier-client"
    // });
    res.redirect('/categories')
}


//action redirige vers le vue login.ejs
indexController.login = (req, res) => { // GET : /login
    res.render('acceuil/login',{
        title:"Login"
    });
};

//redirige vers la vue signup
indexController.signup = (req, res) => { // GET : /signup
    res.render('acceuil/signup',{
        title:"Inscription"
    });
};

//inscription
indexController.SaveSignup = (req, res) => { // POST : /signup
    
    if(!req.body.nom_user       || 
        !req.body.prenom_user   ||
        !req.body.email_user    ||
        !req.body.passord_user  ||
        !req.body.adresse_user  ||
        !req.body.telephone_user    ){

            res.status("400");
            res.send("Invalid details!");
    }else {
        User.findOne({
            where: {email: req.body.email_user}
    
        }).then(user => {
            if (user) {
                res.render('signup', {
                    message: "User Already Exists! Login or choose another user id"});
            }
            if (!user){
                console.log('user not exist')
                User.create({
                    nom: req.body.nom_user,
                    prenom: req.body.prenom_user,
                    adresse: req.body.adresse_user,
                    email: req.body.email_user,
                    password: req.body.passord_user,
                    telephone: req.body.telephone_user
                }).then(res.redirect('/'))
            }
        })
        
    }
    
};


module.exports = indexController;