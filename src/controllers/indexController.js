const indexController = {};
const User = require('../models/user.js');
const Panier = require('../models/panier.js');

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
//action connexion
indexController.ProcessLogin = (req, res) => { // POST : /login
    if(!req.body.email_user || !req.body.password_user){
            res.status("400");
            res.send("Invalid details!");
    }else{
        
        User.findOne({
            where: {email: req.body.email_user},include:[{
                model:Panier,
                where:{
                    valide: 0,
                },
                limit: 1
            }]
    
        }).then(user => {
            // console.log(user)
            if (!user)  
                // return res.redirect('/login'); // l'email n'existe pas 
                return res.json({res:"KO"});
            if (user.email === req.body.email_user && bcrypt.compareSync(req.body.password_user, user.password)) {
                req.session.user = user;
                // res.redirect('/'); // identifiants OK
                res.json({res:"OK"});
            }else{ 
                // res.redirect('/login'); // mauvais identifiant
                res.json({res:"KO"});
            }
        })
    }
};

indexController.logout = (req, res) => { // GET : /logout
    req.session = null
    res.redirect('/');
}

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

            // res.status("400");
            res.json({res:"KO",message:"Données manquante"});
    }
    const regEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; // match valid email, exemple user@gmail.com => OK
    if (regEx.test(req.body.email_user) === false){
        return res.json({res:"KO", message:"Email invalide"});
    }
    User.findOne({
        where: {email: req.body.email_user}

    }).then(async(user) => {
        if (user) {
            return res.json({res: "KO", message:"Cet addresse email éxiste déja, connectez-vous"});
        }
        if (!user){
            let salt = bcrypt.genSaltSync(10);
            const newUser = await User.create({
                nom: req.body.nom_user,
                prenom: req.body.prenom_user,
                adresse: req.body.adresse_user,
                email: req.body.email_user,
                password: bcrypt.hashSync(req.body.passord_user, salt),
                telephone: req.body.telephone_user,
                salt: salt,
                role: 0
            })
            
            req.session.user = newUser;
            // console.log(newUser);
            // res.redirect('/')
            res.status("200");
            res.json({res:"OK"});
            
        }
    })
        
    
};


module.exports = indexController;