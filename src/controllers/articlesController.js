const articlesController = {};
const paginate = require('express-paginate');
const Article = require('../models/article.js');
const mainDir = __dirname;
const path = require('path');
const sharp = require('sharp');
var fs = require('fs');


/**
 * @method GET
 * @url /articles
 */
articlesController.list = async (req, res,next) => {

    Article.findAndCountAll({limit: req.query.limit, offset: req.skip})
    .then(results => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        console.log(req.query.limit)
        res.render('articles/index', {
          articles: results.rows,
          pageCount,
          itemCount,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
          title: "Articles"
        });
    }).catch(err => next(err))





    // Article.findAll().then(articles => {
    //     res.render('articles/index',{
    //         articles: articles,
    //         title: "Articles"
    //     })
    // })
}

/**
 * @method GET
 * @url /articles/jsonList
 */
articlesController.jsonList = (req, res) => {
    Article.findAll().then(articles => {
        try {
            res.json({
                statut: "OK",
                data: articles,
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
articlesController.add = (req, res) => {
    res.render('articles/_addForm', {
        title: "Ajouter un article"
    })
}
articlesController.create = async(req, res) => {
    // console.log(req.body);
    // console.log(req.files);

    let uploadedFile = req.files.image_article; // nom du champ image

    // il faut que le dossier upload existe... ;)
    await uploadedFile.mv('public/uploads/'+uploadedFile.name, err => {if (err) return res.status(500).send(err)});
    fileName = path.parse(uploadedFile.name).name + ".jpg"; // remplace l'extension originale par .jpg

    file = await sharp(uploadedFile.data) // resize si hauteur plus haut que 400 et converti en jpg
        .resize({
            height: 400, // resize si hauteur plus haut que 400px
            withoutEnlargement: true
        })
        .toFormat("jpeg") // converti le fichier en jpg
        .jpeg({ quality: 90 })
        .toFile(`public/uploads/${fileName}`);

    await Article.create({
        nom: req.body.nom_article,
        detail: req.body.detail_article,
        prix: req.body.prix_article,
        // image: req.body.image_article,
        categories_id: Number(req.body.categorie_article),
        image : fileName,
    });

    res.redirect('/admin?tab=articles');
}

/**
 * @method GET
 * @url /articles/edit/:id
 */
articlesController.edit = (req, res) => {
    Article.findOne({
        where: {id: req.params.id}

    }).then(article => {
        // console.log(article)
        res.render('articles/_editForm',{
            title: "Modifier un article",
            article: article
        })
    })
}

/**
 * @method POST
 * @url /articles/update/:id
 */
articlesController.update = async(req, res) => {
    await Article.findOne({
        where: {id: req.params.id}});

    updatedArticle = {
        nom: req.body.nom_article,
        detail: req.body.detail_article,
        prix: req.body.prix_article,
        categories_id: req.body.categorie_article
    };

    if (req.files){
        let uploadedFile = req.files.image_article;
        await uploadedFile.mv('public/uploads/'+uploadedFile.name, err => {if (err) return res.status(500).send(err)});
        
        fileName = path.parse(uploadedFile.name).name + ".jpg"; // remplace l'extension originale par .jpg
        file = await sharp(uploadedFile.data) 
            .resize({ // resize si hauteur plus haut que 400px
                height: 400,
                withoutEnlargement: true
            })
            .toFormat("jpeg") // converti le fichier en jpg
            .jpeg({ quality: 90 })
            .toFile(`public/uploads/${fileName}`);
        
            updatedArticle.image = fileName;
    };

    await Article.update(updatedArticle, {
        where:{
            id:req.params.id
        }
    });

    res.redirect('/admin?tab=articles')
    
}

/**
 * @method GET
 * @url /articles/delete/:id
 */
articlesController.delete = async(req, res) => {
    if (!req.session.user || req.session.user.role !== 1) {
        error = {status: '403',message: 'Permission non accordée'}
        return res.status(403).render('errors/index', {
            title:'Permission non accordée'
        });
    }

    imageName = await Article.findOne({ // imageName.image == imageFilename
        where: {id: req.params.id},
        attributes:['image'],raw:true});

    if (imageName){
        imageTimesUsed = await Article.count({ // recherche le nombre de fois que l'image est utilisé par un article
            where: {image: imageName.image},raw:true});

        if (imageTimesUsed == 1) { // Si il est utiliser une fois on peut le supprimer
            fs.unlink(`public/uploads/${imageName.image}`, (err) => {if (err) throw err});
        }
    }

    await Article.destroy({
        where: {id: req.params.id}})

    res.redirect('/admin?tab=articles')
    
}

module.exports = articlesController;