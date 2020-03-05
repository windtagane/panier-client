const sequelize = require('../database.js').sequelize;
const Sequelize = require('sequelize');

const Categorie = sequelize.define('categories', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom: {type: Sequelize.STRING(45),allowNull:false},
    active: {type: Sequelize.BOOLEAN(),allowNull:false},
    
},
    {tableName: 'categories', timestamps: false, underscored: true}
);

const article = require('./article.js');

// Categorie.hasMany(article, {foreignKey: 'id'});// Une catégorie peut avoir plusieur articles.


module.exports = Categorie;
