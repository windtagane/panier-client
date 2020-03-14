const sequelize = require('../database.js').sequelize;
const Sequelize = require('sequelize');

const Article = sequelize.define('articles', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom: {type: Sequelize.STRING(45),allowNull:false},
    detail: {type: Sequelize.STRING(200),allowNull:false},
    prix: {type: Sequelize.FLOAT(),allowNull:false},
    image: {type: Sequelize.STRING(),allowNull:false},
},
    {tableName: 'articles', timestamps: false, underscored: true}
);
const categorie = require('./categorie.js');
const LignePanier = require('./articles_has_paniers.js');


Article.belongsTo(categorie,{foreignKey: 'categories_id', onDelete: 'cascade', hooks: true });// l'article à une catégorie.
categorie.hasMany(Article, {foreignKey: 'categories_id'});// Une catégorie peut avoir plusieur articles.
// Article.hasMany(LignePanier, {foreignKey: 'articles_id'});// Un article peut avoir plusieur lignes panier.


module.exports = Article;