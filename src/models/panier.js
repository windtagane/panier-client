const sequelize = require('../database.js').sequelize;
const Sequelize = require('sequelize');

const Panier = sequelize.define('paniers', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    prixTotal: {type: Sequelize.DECIMAL(),allowNull:false},
    utilisateurs_id: {type: Sequelize.DECIMAL(), allowNull:false},
    valide: {type: Sequelize.BOOLEAN(), allowNull: false}
    
},
    {tableName: 'paniers', timestamps: false, underscored: true}
);

const User = require('./user.js');
const LignePanier = require('./articles_has_paniers.js');


// Panier.belongsTo(User,{foreignKey: 'utilisateurs_id'}); // le panier appartien à un utilisateur.

// Panier.hasMany(LignePanier, {foreignKey: 'paniers_id'});// Une panier peut avoir plusieur lignes panier.
module.exports = Panier;
