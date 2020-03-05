const indexController = {};

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


module.exports = indexController;