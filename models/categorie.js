"use strict";
module.exports = (sequelize, DataTypes) => {
	const Categorie = sequelize.define(
		"Categorie", {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			nom: {
				type: DataTypes.STRING,
				allowNull: false
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			}
		},
		{
			tableName: "categories",
			underscored: true,
			paranoid: true
		}
	);
	Categorie.associate = function(models) {
		// associations can be defined here
		// Categorie.hasMany(article, {foreignKey: 'id'});// Une catégorie peut avoir plusieur articles.
	};
	return Categorie;
};
