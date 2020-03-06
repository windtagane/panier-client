const sequelize = require('../database.js').sequelize;
const Sequelize = require('sequelize');
var bcrypt = require("bcryptjs");


const User = sequelize.define('utilisateurs', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    nom: {type: Sequelize.STRING(45),allowNull:false},
    prenom: {type: Sequelize.STRING(45),allowNull:false},
    adresse: {type: Sequelize.STRING(200),allowNull:false},
    email: {type: Sequelize.STRING(45),allowNull:false},
    password: {type: Sequelize.STRING(),allowNull:false},
    telephone: {type: Sequelize.STRING(45),allowNull:false},
    salt: {type: Sequelize.STRING(),allowNull:false}


},
    {tableName: 'utilisateurs', timestamps: false, underscored: true}
);

module.exports = User;
