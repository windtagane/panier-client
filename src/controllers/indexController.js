const indexController = {};

indexController.index = (req, res) => {
    // res.render('acceuil/index', {
    //     title: "Panier-client"
    // });
    res.redirect('/categories')
}


//action redirige vers le vue login.ejs
indexController.login = (req, res) => {
    res.render('acceuil/login',{
        title:"Login"

    });
    
};

indexController.signup = (req, res) => {
    res.render('acceuil/signup',{
        title:"Inscription"

    });
    
};


module.exports = indexController;