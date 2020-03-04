const sequelize = require('../database.js').sequelize;
const Sequelize = require('sequelize');

const Article = sequelize.define('articles', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom: {type: Sequelize.STRING(45),allowNull:false},
    detail: {type: Sequelize.STRING(200),allowNull:false},
    prix: {type: Sequelize.DECIMAL(),allowNull:false},
    image: {type: Sequelize.STRING(),allowNull:false},
},
    {tableName: 'articles', timestamps: false, underscored: true}
);
const categorie = require('./categorie.js');

Article.belongsTo(categorie,{foreignKey: 'categories_id'});// l'article à une catégorie.
categorie.hasMany(Article, {foreignKey: 'id'});// Une catégorie peut avoir plusieur articles.


module.exports = Article;