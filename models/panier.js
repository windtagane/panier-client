"use strict";
module.exports = (sequelize, DataTypes) => {
	const Panier = sequelize.define(
		"Panier",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement:true, 
				primaryKey:true
			},
			prixTotal: {
				type:DataTypes.FLOAT,
				allowNull:false
			},
			utilisateurs_id: {
				type: DataTypes.DECIMAL,
				allowNull:false
			},
			valide: {
				type: DataTypes.BOOLEAN,
				allowNull:false
			}
		},
		{
			tableName: 'paniers', 
			underscored: true, 
			paranoid: true
		}
	);
	Panier.associate = function(models) {
		// associations can be defined here
		
		// Panier.belongsTo(User,{foreignKey: 'utilisateurs_id'}); // le panier appartien à un utilisateur.
		// Panier.hasMany(LignePanier, {foreignKey: 'paniers_id'});// Une panier peut avoir plusieur lignes panier.
	};
	return Panier;
};
