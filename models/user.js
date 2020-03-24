"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement:true, 
				primaryKey:true 
			},
			nom: {
				type: DataTypes.STRING,
				allowNull:false
			},
			prenom: {
				type: DataTypes.STRING,
				allowNull:false
			},
			adresse: {
				type: DataTypes.STRING,
				allowNull:false
			},
			email: {
				type: DataTypes.STRING,
				allowNull:false
			},
			password: {
				type: DataTypes.STRING,
				allowNull:false
			},
			telephone: {
				type: DataTypes.STRING,
				allowNull:false
			},
			salt: {
				type: DataTypes.STRING,
				allowNull:false
			},
			role: {
				type: DataTypes.INTEGER,
				allowNull:false
			}
		},
		{
			tableName: 'utilisateurs', 
			underscored: true, 
			paranoid: true
		}
	);
	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};
