"use strict";
module.exports = (sequelize, DataTypes) => {
	const Article = sequelize.define(
		"Article", {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			nom: { 
				type: DataTypes.STRING, 
				allowNull: false 
			},
			detail: { 
				type: DataTypes.STRING, 
				allowNull: false 
			},
			prix: { 
				type: DataTypes.INTEGER, 
				allowNull: false },
			image: { 
				type: DataTypes.STRING, 
				allowNull: false 
			}
		},
		{
			tableName: 'articles', 
			timestamps: false,
			underscored: true
		}
	);
	Article.associate = function(models) {
		console.log(models);
		// associations can be defined here
		Article.belongsTo(categorie, {
			foreignKey: "categories_id",
			onDelete: "cascade",
			hooks: true
		}); // l'article à une catégorie.
		categorie.hasMany(Article, {
			foreignKey: "categories_id",
			onDelete: "cascade",
			hooks: true
		}); // Une catégorie peut avoir plusieur articles.
		// Article.hasMany(LignePanier, {foreignKey: 'articles_id'});// Un article peut avoir plusieur lignes panier.
	};
	return Article;
};
