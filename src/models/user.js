const sequelize = require('../database.js').sequelize;
const Sequelize = require('sequelize');


const User = sequelize.define('utilisateurs', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom: {type: Sequelize.STRING(45),allowNull:false},
    prenom: {type: Sequelize.STRING(45),allowNull:false},
    adresse: {type: Sequelize.STRING(200),allowNull:false},
    email: {type: Sequelize.STRING(45),allowNull:false},
    password: {type: Sequelize.STRING(45),allowNull:false},
    telephone: {type: Sequelize.STRING(45),allowNull:false},

},
    {tableName: 'utilisateurs', timestamps: false, underscored: true}
);

module.exports = User;
