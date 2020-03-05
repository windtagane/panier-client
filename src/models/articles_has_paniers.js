const sequelize = require('../database.js').sequelize;
const Sequelize = require('sequelize');

const LignePanier = sequelize.define('articles_has_paniers', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    quantite: {type: Sequelize.INTEGER(),allowNull:false},
    
},
    {tableName: 'articles_has_paniers', timestamps: false, underscored: true}
);

const Panier = require('./panier.js');
const Article = require('./article.js');


// LignePanier.belongsTo(Panier,{foreignKey: 'paniers_id'}); // 1 ligne de panier appartien à un Panier.
// Panier.hasMany(LignePanier, {foreignKey: 'paniers_id'});// Une panier peut avoir plusieur lignes panier.

// LignePanier.belongsTo(Article,{foreignKey: 'articles_id'}); // 1 ligne de panier concerne un article.
// Article.hasMany(LignePanier, {foreignKey: 'articles_id'});// Un article peut avoir plusieur lignes panier.

