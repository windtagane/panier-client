const indexController = {};
const User = require('../models/user.js');
var bcrypt = require("bcryptjs");

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
//action redirige vers le vue login.ejs
indexController.ProcessLogin = (req, res) => { // POST : /login
    if(!req.body.email_user || !req.body.passord_user){
            res.status("400");
            res.send("Invalid details!");
    }else{
        
        User.findOne({
            where: {email: req.body.email_user}
    
        }).then(user => {
            if (user.email === req.body.email_user && bcrypt.compareSync(req.body.passord_user, user.password)){
                
                console.log('good login')
                req.session.user = user;
                res.redirect('/');
            }else{
                console.log(bcrypt.compareSync(req.body.passord_user, user.password))
                console.log(user.password)
                console.log(req.body.passord_user)
                console.log('bad login')
            }
        })
    }
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
                res.render('acceuil/signup', {
                    message: "Cet addresse email éxiste déja, connectez-vous.",
                    title:"Inscription"});
            }
            if (!user){
                console.log('user not exist')
                let salt = bcrypt.genSaltSync(10);
                let newUser = {
                    nom: req.body.nom_user,
                    prenom: req.body.prenom_user,
                    adresse: req.body.adresse_user,
                    email: req.body.email_user,
                    password: bcrypt.hashSync(req.body.passord_user, salt),
                    telephone: req.body.telephone_user,
                    salt: salt
                };
                User.create({
                    nom: req.body.nom_user,
                    prenom: req.body.prenom_user,
                    adresse: req.body.adresse_user,
                    email: req.body.email_user,
                    password: bcrypt.hashSync(req.body.passord_user, salt),
                    telephone: req.body.telephone_user,
                    salt: salt
                }).then(()=>{
                    req.session.user = newUser;
                    res.redirect('/')
                })
            }
        })
        
    }
    
};


module.exports = indexController;